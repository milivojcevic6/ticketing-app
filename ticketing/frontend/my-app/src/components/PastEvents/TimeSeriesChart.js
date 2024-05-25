import React from 'react';
import {
    Border,
    VictoryAxis,
    VictoryChart,
    VictoryLabel,
    VictoryLegend,
    VictoryLine,
    VictoryTooltip,
    VictoryVoronoiContainer, VictoryZoomContainer
} from 'victory';

import "./past.css";


function TimeSeriesChart ({ data, timeFrameFilter }) {


    // Custom function to format the date labels
    function formatDateLabel(date) {
        
        // console.log(date)
        
        try {
            const dateFormat = new Date(date);
            if (isNaN(dateFormat.getTime())) {
                return null;  // Invalid date string
            }
            return dateFormat.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        } catch (error) {
            console.error("Error parsing date:", error);
            return null;
        }
    }
    
    const filterDataByTimeFrame = (data, timeFrameFilter) => {
        const currentDate = new Date();
        let startDate;

        switch (timeFrameFilter) {
            case '1week':
                startDate = new Date();
                startDate.setDate(currentDate.getDate() - 7);
                break;
            case '1month':
                startDate = new Date();
                startDate.setMonth(currentDate.getMonth() - 1);
                break;
            case '6months':
                startDate = new Date();
                startDate.setMonth(currentDate.getMonth() - 6);
                break;
            case '1year':
                startDate = new Date();
                startDate.setFullYear(currentDate.getFullYear() - 1);
                break;
            default:
                startDate = new Date(timeFrameFilter.startDate);
                break;
        }

        const filteredData = data.filter(event => {
            const eventDate = new Date(event.dateTime);
            return eventDate >= startDate && eventDate <= currentDate;
        });

        // Sort filtered data by event date (ascending)
        const sortedData = [...filteredData].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

        // console.log(sortedData)

        // Group data by event type (using the sorted data)
        return sortedData.reduce((acc, event) => {
            acc[event.type] = (acc[event.type] || []).concat({
                x: new Date(event.dateTime).toISOString().split('T')[0],
                y: event.participated,
                label: event.name
            });
            // console.log(acc)
            return acc;
        }, {});
        
    };

    // Function to get the maximum y value from the data
    const getMaxYValue = (data) => {
        return Math.max(...data.flatMap(d => d.map(item => item.y)));
    };


    const filteredData = filterDataByTimeFrame(data, timeFrameFilter); // Filter data based on time frame
    const eventTypes = Object.keys(filteredData);

    let maxYValue = getMaxYValue(Object.values(filteredData));
    
    return (
        <div>
            <br/>
            <br/>
            <VictoryChart width={1000} height={500} domainPadding={20}
                          containerComponent={
                              <VictoryZoomContainer/>
                          }
            >
                <VictoryAxis
                    // tickValues={filterTickValues(filteredData[eventTypes[0]])}
                    // tickValues={filteredData[eventTypes[0]]}
                    tickFormat={(t) => formatDateLabel(t)}
                    tickLabelComponent={<VictoryLabel
                        angle={-45} style={{fontSize : "10"}} textAnchor="end" />}
                    style={{
                        grid: { stroke: '#BCC3B8', strokeWidth: 1.5 },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    domain={[0, maxYValue * 1.2]} // Extend y-axis slightly beyond the maximum value
                    style={{
                        tickLabels: { fontSize: 10},
                        grid: { stroke: "#BCC3B8"}, // Light grid lines
                    }}
                />
                {eventTypes.map((type, index) => (
                    <VictoryLine
                        key={type}
                        data={filteredData[type]}
                        x="x"
                        y="y"
                        // labelComponent = {
                        //     <VictoryLabel>
                        //         // set VictoryLabel to appear on hover on click
                        //     </VictoryLabel>
                        // }
                        style={{
                            data: { stroke: ["rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"][index],
                                strokeWidth: 5}
                        }}
                    />
                ))}
                {/*{eventTypes.map((type, index) => (*/}
                {/*    <VictoryTooltip*/}
                {/*        key={type}*/}
                {/*        data={filteredData[type]}*/}
                {/*        x={data.x}*/}
                {/*        y={data.y}*/}
                {/*        renderContent={({ data }) => ({*/}
                {/*            value: `${data.label}`,*/}
                {/*            x: `${data.x}`,*/}
                {/*            y: `${data.y}`,*/}
                {/*            alignment: 'middle',*/}
                {/*        })}*/}
                {/*    />*/}
                {/*))}*/}
                


                <VictoryLegend x={50} y={0}
                               title="Event Types"
                               centerTitle
                               orientation="horizontal"
                               gutter={20}
                               borderComponent={<Border 
                                   style={{ fill: "white", stroke: "#212A3E" }} />}
                               style={{ border: { stroke: "black" },
                                   title: { fontSize: 15 }, labels: { fontSize: 10}}}
                               data={[
                                   { name: "Educational", symbol: { fill: "rgba(255, 99, 132, 0.6)" } },
                                   { name: "Social", symbol: { fill: "rgba(54, 162, 235, 0.6)" } },
                                   { name: "Sport", symbol: { fill: "rgba(75, 192, 192, 0.6)" } },
                                   { name: "Trip", symbol: { fill: "rgba(153, 102, 255, 0.6)" } },
                               ]}
                />
            </VictoryChart>
        </div>
    );
}

export default TimeSeriesChart;