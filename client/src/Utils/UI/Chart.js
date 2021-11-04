import { JSCharting } from "jscharting-react";

const Chart = ({ points, yAxis }) => {


    const config = {
        type: 'line',
        series: [
            {
                points: points
            }
        ],
        xAxis_label_text: "Date",
        yAxis_label_text: yAxis,
    };

    return (<>
        <div style={{
            maxWidth: '700px',
            height: '400px',
            margin: '0px auto'
        }}><JSCharting options={config} /></div>
    </>)
}

export default Chart;