import trimesh

def simplify_mesh(input_file, output_file, simplification_ratio=0.5):
    mesh = trimesh.load(input_file)
    simplified_mesh = mesh.simplify_quadratic_decimation(int(len(mesh.faces) * simplification_ratio))
    simplified_mesh.export(output_file)