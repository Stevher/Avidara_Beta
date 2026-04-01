#!/bin/bash
# Evidara Platform - EBS Volume Mount Script
# Run once on first EC2 startup to mount the data volume

set -e

DATA_DEVICE="/dev/nvme1n1"  # May vary - check with lsblk
DATA_MOUNT="/data"

echo "=== Evidara EBS Mount Script ==="

# Check if device exists
if [ ! -b "$DATA_DEVICE" ]; then
    echo "ERROR: Device $DATA_DEVICE not found"
    echo "Run 'lsblk' to find the correct device name"
    exit 1
fi

# Check if already mounted
if mountpoint -q "$DATA_MOUNT"; then
    echo "WARNING: $DATA_MOUNT is already mounted"
    exit 0
fi

# Create filesystem if needed (only on first run)
if ! blkid "$DATA_DEVICE" | grep -q 'TYPE='; then
    echo "Creating ext4 filesystem on $DATA_DEVICE..."
    mkfs.ext4 "$DATA_DEVICE"
fi

# Create mount point
mkdir -p "$DATA_MOUNT"

# Mount the volume
echo "Mounting $DATA_DEVICE to $DATA_MOUNT..."
mount "$DATA_DEVICE" "$DATA_MOUNT"

# Add to fstab for persistence across reboots
if ! grep -q "$DATA_MOUNT" /etc/fstab; then
    UUID=$(blkid -s UUID -o value "$DATA_DEVICE")
    echo "UUID=$UUID $DATA_MOUNT ext4 defaults,nofail 0 2" >> /etc/fstab
    echo "Added to /etc/fstab"
fi

# Create PostgreSQL data directory
mkdir -p "$DATA_MOUNT/pgdata"
chown -R 999:999 "$DATA_MOUNT/pgdata"

echo "=== EBS volume mounted successfully ==="
echo "PostgreSQL data directory: $DATA_MOUNT/pgdata"
