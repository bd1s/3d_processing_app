def extract_mtl_metadata(file_path):
    """Extract metadata from an MTL file."""
    print(f"Reading MTL file from path: {file_path}")
    
    metadata = {}
    current_material = None

    try:
        with open(file_path, 'r') as file:
            for line in file:
                print(f"Processing line: {line.strip()}")  # Debug line
                if line.startswith('newmtl '):  # New material
                    current_material = line.strip().split(' ')[1]
                    metadata[current_material] = {}
                    print(f"New material found: {current_material}")  # Debug line
                elif line.startswith('Ka ') and current_material:  # Ambient color
                    metadata[current_material]['ambient'] = line.strip()
                    print(f"Ambient color for {current_material}: {line.strip()}")  # Debug line
                elif line.startswith('Kd ') and current_material:  # Diffuse color
                    metadata[current_material]['diffuse'] = line.strip()
                    print(f"Diffuse color for {current_material}: {line.strip()}")  # Debug line
                elif line.startswith('Ks ') and current_material:  # Specular color
                    metadata[current_material]['specular'] = line.strip()
                    print(f"Specular color for {current_material}: {line.strip()}")  # Debug line
                # Add more lines as needed for other properties
    except Exception as e:
        print(f"Error reading MTL file: {str(e)}")
        raise

    print("MTL metadata extraction completed.")
    return metadata
