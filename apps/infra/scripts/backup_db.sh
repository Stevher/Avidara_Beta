#!/bin/bash
# Evidara Platform - Database Backup Script
# Add to cron: 0 2 * * * /opt/evidara/scripts/backup_db.sh

set -e

S3_BUCKET="evidara-platform"
BACKUP_DIR="/tmp/evidara-backup"
DATE=$(date +%Y-%m-%d)

echo "=== Evidara Database Backup - $DATE ==="

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Dump database
echo "Dumping PostgreSQL database..."
docker exec evidara-postgres pg_dump -U evidara evidara | gzip > "$BACKUP_DIR/pgdump-$DATE.sql.gz"

# Upload to S3
echo "Uploading to S3..."
aws s3 cp "$BACKUP_DIR/pgdump-$DATE.sql.gz" "s3://$S3_BUCKET/backups/pgdump-$DATE.sql.gz"

# Cleanup local backup
rm -rf "$BACKUP_DIR"

echo "=== Backup completed: s3://$S3_BUCKET/backups/pgdump-$DATE.sql.gz ==="
