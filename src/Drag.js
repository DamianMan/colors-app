import GridLayout from "react-grid-layout";

export default function MyFirstGrid() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 4, },
        { i: "b", x: 1, y: 0, w: 1, h: 4, },
        { i: "c", x: 2, y: 0, w: 1, h: 4 },
        { i: "d", x: 3, y: 0, w: 1, h: 4 },
        { i: "e", x: 4, y: 0, w: 1, h: 4 },
        { i: "f", x: 0, y: 3, w: 1, h: 4 },

    ];
    return (
        <GridLayout
            className="layout"
            layout={layout}
            cols={5}
            rowHeight={30}
            width={1200}
        >
            {layout.map((c, i) => <div key={c.i} style={{ border: '1px solid black', backgroundColor: '#7ae94b' }}>{c.i}</div>
            )}


        </GridLayout>
    );

}

