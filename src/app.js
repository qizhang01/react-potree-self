import React from "react";
import "../public/libs/potree/potree.css";

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, }}>
                <div id="potree_render_area"></div>
                <div id="potree_sidebar_container"> </div>
            </div>
        )
    }

    componentDidMount() {
        window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));

        viewer.setEDLEnabled(false);
        viewer.setFOV(60);
        viewer.setPointBudget(1_000_000);
        viewer.loadSettingsFromURL();
        viewer.setBackground("skybox");

        viewer.setDescription("Point cloud courtesy of <a target='_blank' href='https://www.sigeom.ch/'>sigeom sa</a>");

        viewer.loadGUI(() => {
            viewer.setLanguage('en');
            $("#menu_tools").next().show();
            $("#menu_clipping").next().show();
            viewer.toggleSidebar();
        });

        // Load and add point cloud to scene
        Potree.loadPointCloud("./pointclouds/test/metadata.json", "test", e => {
            let scene = viewer.scene;
            let pointcloud = e.pointcloud;

            let material = pointcloud.material;
            material.size = 1;
            material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
            material.shape = Potree.PointShape.SQUARE;


            scene.addPointCloud(pointcloud);

            viewer.fitToScreen();
            // scene.view.setView(
            // 	[589974.341, 231698.397, 986.146],
            // 	[589851.587, 231428.213, 715.634],
            // );
        });
    }
}
