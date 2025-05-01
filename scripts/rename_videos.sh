#!/bin/bash

# NOTE: If you're on Windows using VS Code and encounter errors like '$'\r': command not found',
#       run the following command in your terminal before executing this script:
#       sed -i 's/\r$//' scripts/rename_videos.sh

# Target directory
dir="./client/public/videos"

# Output JSON file directly in working directory
json_output="$dir/rename_preview.json"
echo '{"CameraIndex":[' > "$json_output"

# Find .mp4 files, extract base numbers, sort in reverse order
first=1
find "$dir" -maxdepth 1 -type f -name "[0-9][0-9][0-9].mp4" | \
    sed -E 's/.*\/([0-9]{3})\.mp4/\1/' | \
    sort -nr | \
    while read -r num; do
        newnum=$(printf "%03d" $((10#$num + 1)))

        # Perform actual rename
        mv "$dir/$num.mp4" "$dir/$newnum.mp4"
        echo "Renamed $num.mp4 -> $newnum.mp4"

        # Append to JSON (excluding .mp4 extension)
        if [ $first -eq 1 ]; then
            first=0
        else
            echo "," >> "$json_output"
        fi
        echo -n "  {\"URLname\": \"$num\", \"Cameraname\": \"$newnum\"}" >> "$json_output"
    done

# Close JSON structure
echo ']}' >> "$json_output"
echo -e "\nJSON saved to $json_output"
