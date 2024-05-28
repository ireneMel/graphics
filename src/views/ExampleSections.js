import React from 'react';
import ExampleButton from "./atoms/ExampleButton";
import Section from "./molecules/Section";

class ExampleSections extends React.Component {
    render() {
        return (
            <div>
                <Section title="Examples: \set2D with parameters">
                    <ExampleButton
                        inserts="\set2D(-5,5,-4,6,'xTitle','yTitle','title' ,1,0,100,100,100); f=3\arctg(x+1); \plot([f,-x+5, 3x+5]);" label="Example 1"/>
                </Section>
                <Section title="Examples: 2D plots and tables">
                    <ExampleButton inserts="\set2D(-5,5,-4,6); f=3\arctg(x+1); \plot([f,-x+5, 3x+5]);"
                                   title="" label="plot"/>
                    <ExampleButton
                        inserts="\set2D([-20, 20, -20, 20],[1,1,18,6,3]);\\n g = x\sin(x); k = x\cos(x);\n f = \paramPlot([g, k], [0, 5.9 \pi]);"
                        title=""
                        label="paramPlot"/>
                    <ExampleButton
                        inserts="\set2D( 0, 10,  -5, 30);\\n \tablePlot([[0, 1, 2, 3, 4, 5],[0, 1, 4, 9, 16, 25],[0, -1, -2, -3, -4, -5],[0, 4, 8, 12, 16, 20]]);"
                        title=""
                        label="tablePlot"/>
                    <ExampleButton
                        label="showPlots"
                        title=""
                        inserts="\set2D(-5, 5, -5, 5);\n f1 = \plot(\tg(x));\\n f2 = \tablePlot([[0, 1, 4, 9, 16, 25], [0, 1, 2, 3, 4, 5]]);\n f3 = \paramPlot([\sin(x), \cos(x)], [-10, 10]);\n f4=\tablePlot([[0, 1, 4, 9, 16, 25], [0, -1, -2, -3, -4, -5]]);\n \showPlots([f1, f2, f3, f4]);"
                    />
                    <ExampleButton
                        title=""
                        label="approximation"
                        inserts=" SPACE=R64[x];\set2D(0, 5, -5, 10);\\n A=[[0, 1, 2, 3,  4, 5],[3, 0, 4, 10, 5, 10]];\n  t=\table(A);\n p=\approximation(t,4);\n P=\plot(p );\n T=\tablePlot(t);\showPlots([P,T]);\print(p);"
                    />
                    <ExampleButton
                        label="table"
                        title=""
                        inserts="\set2D(-1,5,-10,10);\n A=[[0, 1, 2, 3, 4, 5],[3, 0, 4, 10, 5, 10]];\\n tab=\table(A); \tablePlot(tab); "
                    />
                </Section>
                <Section title="2D plots and tables">
                    {/*<ExampleButton*/}
                    {/*    label="tableFromFile"*/}
                    {/*    title=""*/}
                    {/*    inserts="=\tableFromFile('');"*/}
                    {/*/>*/}
                    <ExampleButton
                        label="table"
                        title=""
                        inserts="=\table();"
                    />
                </Section>
                <Section title="Examples: 3D plots">
                    <ExampleButton
                        label="plot3d"
                        title=""
                        inserts="\clean(); SPACE = R64[x, y, z];f = x^2 / 20 + y^2 / 20;\n pl=\plot3d([f], [-20, 20, -20, 20]);"
                    />
                    <ExampleButton
                        label="implicitPlot3d_1"
                        title=""
                        inserts="\clean(); SPACE = R64[x, y, z];f = -x^2+2y^2+3z^2-25; iPl=\implicitPlot3d( f, -10, 10, -10, 10, -10, 10);"
                    />
                    <ExampleButton
                        label="implicitPlot3d_2"
                        title=""
                        inserts="\clean(); SPACE = R64[x, y, z];f = (x^2+y^2+z^2)^2-80xyz; iPl=\implicitPlot3d( f, -10, 10, -10, 10, -10, 10);"
                    />
                    <ExampleButton
                        label="explicitPlot3d"
                        title=""
                        inserts="\clean(); SPACE = R64[x, y, z];f = (x^2+y^2)/20; ePl=\explicitPlot3d( f, -10, 10, -10, 10, -10, 10, 40);"
                    />
                    <ExampleButton
                        label="showPlots3D"
                        title=""
                        inserts="\clean(); SPACE = R64[x, y, z]; \set3D(-5,5,-5,5,-10,10,40); f = -x^2+2y^2+3z^2-25; g = (x^2+y^2)/20; h=0; ePl=\showPlots3D(\implicitPlot3d(f), \explicitPlot3d(g));"
                    />
                </Section>
                <Section title="Examples: Parametric 3D plots">
                    <ExampleButton
                        label="Torus"
                        title=""
                        inserts="\clean(); SPACE = R64[u, v]; X=\cos(u)*(3+\cos(v)); Y=\sin(u)*(3+\cos(v)); Z=\sin(v);pPl=\parametricPlot3d(X, Y, Z, 0, 7, 0, 7, 64);"
                    />
                    <ExampleButton
                        label="Spiral"
                        title=""
                        inserts="\clean(); SPACE = R64[u, v]; X=\cos(u)*(\cos(v)+2); Y=\sin(u) * (\cos(v)+2); Z=\sin(v)+u/2+1; pPl=\parametricPlot3d(X,Y,Z, -6.3, 6.3, -3.15, 3.15, 64);"
                    />
                    <ExampleButton
                        label="Dini's surface"
                        title=""
                        inserts="\clean(); SPACE = R64[u, v]; X = \cos(u) * \sin(v) * 2.5; Y = \sin(u) * \sin(v) * 2.5; Z = \cos(v) + \ln(\tg(v / 2)) + u / 6; pPl=\parametricPlot3d(X, Y, Z, 0, 12.56, 0.001, 2, 64);"
                    />
                </Section>
                <Section title="Examples: planimetria">
                    <ExampleButton
                        label="Point"
                        title=""
                        inserts="\set2D(-10, 10, -10, 10); p = \paintElement('a = Point(2, 2).display(%A%);');"
                    />
                    <ExampleButton
                        label="Line"
                        title=""
                        inserts="\set2D(-10, 10, -10, 10); p = \paintElement('l2 = Line(Point(2, 2), Point(4, 4)).display(%L%);');"
                    />
                    <ExampleButton
                        label="Ray"
                        title=""
                        inserts="\set2D(-10, 10, -10, 10); p = \paintElement('p1 = Point(3,3).display(%P1%); p2 = Point(4, 2).display(%P2%); ray = Ray(p1, p2).display(%Ray%)');"
                    />
                    <ExampleButton
                        label="Pentagon"
                        title=""
                        inserts="\set2D(-10, 10, -10, 10); p = \paintElement('center = Point(0,0).display(%Center%); octagon = RegularPentagon(5, center).display(%%);');"
                    />
                    <ExampleButton
                        label="Hexagon"
                        title=""
                        inserts="\set2D(-10, 10, -10, 10); p = \paintElement('center = Point(0, 0).display(%Center%); hexagon = RegularHexagon(5, center).display(%%);');"
                    />
                    <ExampleButton
                        label="Octagon"
                        title=""
                        inserts="\set2D(-10, 10, -10, 10); p = \paintElement('center = Point(0, 0).display(%Center%); octagon = RegularOctagon(5, center).display(%%);');"
                    />
                    <ExampleButton
                        label="Polygon"
                        title=""
                        inserts="\set2D(-10, 10, -10, 10); p = \paintElement('polygon = RegularPolygon(15).display(%%)');"
                    />
                    <ExampleButton
                        label="Polygon With Side Length"
                        title=""
                        inserts="\set2D(-10, 10, -10, 10); p = \paintElement('polygon = RegularPolygon(15, 1.0).display(%%)');"
                    />
                    <ExampleButton
                        label="Polygon With Side Length And Center"
                        title=""
                        inserts="\set2D(-10, 10, -10, 10); p = \paintElement('center = Point(1, 1).display(%%); polygon = RegularPolygon(7, 2.0, center).display(%%);');"
                    />
                    <ExampleButton
                        label="Circle"
                        title=""
                        inserts="\set2D([0, 5, 0, 5], [1,1,18,6,3]); p = \paintElement('c1 = Circle(5.0).display(%%);');"
                    />
                    <ExampleButton
                        label="Circle With Center"
                        title=""
                        inserts="\set2D([-10, 10, -10, 10], [%ES%]); p = \paintElement('c = Circle(2.0, Point(2.0, 3.0)).display(%%);');"
                    />
                    <ExampleButton
                        label="Circum circle"
                        title=""
                        inserts="\set2D([-10, 10, -10, 10], [%ES%]); p = \paintElement('cc = circumcircle(Triangle(Point(5.0,1.0),Point(0.0,4.0),Point(0.0,0.0))).display(%%);');"
                    />
                    <ExampleButton
                        label="Ellipse"
                        title=""
                        inserts="\set2D([-10, 10, -10, 10], [%ES%]); p = \paintElement('e = Ellipse(5.0,3.0).display(%%);');"
                    />
                    <ExampleButton
                        label="Ellipse With Center"
                        title=""
                        inserts="\set2D([-10, 10, -10, 10], [%ES%]); p = \paintElement('e = Ellipse(5.0,3.0, Point(1.0, 4.0)).display(%%);');"
                    />
                </Section>
            </div>);
    }
}

export default ExampleSections;