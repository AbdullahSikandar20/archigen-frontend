import { GLTFExporter } from 'three-stdlib'
import { saveAs } from 'file-saver'

export function exportToGLTF(object3D) {
  if (!object3D) {
    alert("Nothing to export yet!");
    return;
  }

  const exporter = new GLTFExporter();

  exporter.parse(
    object3D,
    (result) => {
      const data = JSON.stringify(result, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      saveAs(blob, "archigen-house.gltf");
    },
    { binary: false }
  );
}
