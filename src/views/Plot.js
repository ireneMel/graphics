import React from 'react';
import Button from "./atoms/Button";
import Section from "./molecules/Section";

class Plot extends React.Component {
    render() {
        return (
            <div>
                <Section title="Examples: 2D plots and tables">
                    <Button inserts="\set2D(-5,5,-4,6); f=3\arctg(x+1); \plot([f,-x+5, 3x+5]);"
                            title="Մեկ փոփոխականի ֆունկցիայի գրաֆիկը՝ (y(x), [x1, x2])" label="plot"/>
                    <Button
                        inserts="\set2D([-20, 20, -20, 20],[1,1,18,6,3]);\\n g = x\sin(x); k = x\cos(x);\n f = \paramPlot([g, k], [0, 5.9 \pi]);"
                        title="Պարամետրական տեսքով տրված ֆունկցիայի գրաֆիկ՝ ([x(t), y(t)], [t1, t2])"
                        label="paramPlot"/>
                    <Button
                        inserts="\set2D( 0, 10,  -5, 30);\\n \tablePlot([[0, 1, 2, 3, 4, 5],[0, 1, 4, 9, 16, 25],[0, -1, -2, -3, -4, -5],[0, 4, 8, 12, 16, 20]]);"
                        title="Աղյուսակային ֆունկցիայի գրաֆիկը կարելի է տալ ([[x1,.., xn],[y1,..,yn]]) կետերի աբսցիսների և օրդինատների արժեքների միջոցով"
                        label="tablePlot"/>
                    <Button
                        label="showPlots"
                        title="Մի քանի ֆունկցիաների ([G1,.., Gn]) գրաֆիկների կառուցումը մեկ նկարի վրա "
                        inserts="\set2D(-5, 5, -5, 5);\n f1 = \plot(\tg(x));\\n f2 = \tablePlot([[0, 1, 4, 9, 16, 25], [0, 1, 2, 3, 4, 5]]);\n f3 = \paramPlot([\sin(x), \cos(x)], [-10, 10]);\n f4=\tablePlot([[0, 1, 4, 9, 16, 25], [0, -1, -2, -3, -4, -5]]);\n \showPlots([f1, f2, f3, f4]);"
                    />
                    <Button
                        title="Աղյուսակային ֆունկցիայի ապրոկսիմացիա տրված աստիճանի բազմանդամով"
                        label="approximation"
                        inserts=" SPACE=R64[x];\set2D(0, 5, -5, 10);\\n A=[[0, 1, 2, 3,  4, 5],[3, 0, 4, 10, 5, 10]];\n  t=\table(A);\n p=\approximation(t,4);\n P=\plot(p );\n T=\tablePlot(t);\showPlots([P,T]);\print(p);"
                    />
                    <Button
                        label="table"
                        title="Աղյուսակի ստեղծում ըստ  մատրիցի կամ մեկ այլ աղյուսակի:Սյուների նշանակումը՝ ['x',"
                        inserts="\set2D(-1,5,-10,10);\n A=[[0, 1, 2, 3, 4, 5],[3, 0, 4, 10, 5, 10]];\\n tab=\table(A); \tablePlot(tab); "
                    />
                </Section>
                <Section title="2D plots and tables">
                    <Button
                        label="tableFromFile"
                        title="Աղյուսակի ստեղծում բեռնված ֆայլից"
                        inserts="=\tableFromFile('');"
                    />
                    <Button
                        label="table"
                        title="Աղյուսակի ստեղծում ըստ  մատրիցի կամ մեկ այլ աղյուսակի:Սյուների նշանակումը՝ ['x',"
                        inserts="=\table();"
                    />
                </Section>
                <Section title="Examples: 3D plots">
                    <Button
                        label="plot3d"
                        title="Աղյուսակի ստեղծում բեռնված ֆայլից"
                        inserts="\clean(); SPACE = R64[x, y, z];f = x^2 / 20 + y^2 / 20;\newline pl=\plot3d([f], [-20, 20, -20, 20]);"
                    />
                    <Button
                        label="implicitPlot3d_1"
                        title="Աղյուսակի ստեղծում բեռնված ֆայլից"
                        inserts="\clean(); SPACE = R64[x, y, z];f = -x^2+2y^2+3z^2-25; iPl=\implicitPlot3d( f, -10, 10, -10, 10, -10, 10);"
                    />
                    <Button
                        label="implicitPlot3d_2"
                        title="Աղյուսակի ստեղծում բեռնված ֆայլից"
                        inserts="\clean(); SPACE = R64[x, y, z];f = (x^2+y^2+z^2)^2-80xyz; iPl=\implicitPlot3d( f, -10, 10, -10, 10, -10, 10);"
                    />
                    <Button
                        label="explicitPlot3d"
                        title="Աղյուսակի ստեղծում բեռնված ֆայլից"
                        inserts="\clean(); SPACE = R64[x, y, z];f = (x^2+y^2)/20; ePl=\explicitPlot3d( f, -10, 10, -10, 10, -10, 10, 40);"
                    />
                    <Button
                        label="showPlots3D"
                        title="Աղյուսակի ստեղծում բեռնված ֆայլից"
                        inserts="\clean(); SPACE = R64[x, y, z]; \set3D(-5,5,-5,5,-10,10,40); f = -x^2+2y^2+3z^2-25; g = (x^2+y^2)/20; h=0; ePl=\showPlots3D(\implicitPlot3d(f), \explicitPlot3d(g));"
                    />
                </Section>
                <Section title="Examples: Parametric 3D plots">

                </Section>
                <Section title="Examples: Table in text">

                </Section>
                <Section title="Examples: planimetria">

                </Section>
            </div>);
    }
}

export default Plot;