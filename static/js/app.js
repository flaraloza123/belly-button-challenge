var data;

// Calling in the data 
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((resp) => {
    console.log(resp)
    data = resp
    let dropDown = d3.select("#selDataset")
    resp.names.forEach((name) => {
        dropDown.append("option").text(name)
    })
    buildChart(resp.names[0])
})

// Creating option change function
function optionChanged(selectedID) {
    buildChart(selectedID)
}

// Creating Bar Chart
let buildChart = (selectedID) => {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((resp) => {
        console.log(resp)
        data = resp

        // Dropdown Selection
        let dropDown = d3.select("#selDataset")
        resp.names.forEach((name) => {
            dropDown.append("option").text(name)
        })
        if (!data) {
            return
        }

        // Setting Chart Variables
        var filteredData = data.samples.filter(row => row.id == selectedID)[0]
        let x = filteredData.sample_values.slice(0, 10).reverse()
        let y = filteredData.otu_ids.slice(0, 10).map(id => "OTU " + id).reverse()
        let hoverText = filteredData.otu_labels.slice(0, 10).reverse()

        // Data for Bar Chart
        let barData = [
            {
                x: x,
                y: y,
                text: hoverText,
                type: "bar",
                orientation: "h",
                marker: {
                    color: 'purple'
                  }
            }
        ]
        let layout = {
            title: "Top 10 OTUs"
        }
        let config = {
            responsive: true
        }

        // Plotting Bar Chart
        Plotly.newPlot("bar", barData, layout, config)

        // Creating Bubble Chart
            
        let trace1 = {
            x: filteredData.otu_ids,
            y: filteredData.sample_values,
            text: filteredData.otu_labels,
            mode: 'markers',
            marker: {
                color: filteredData.otu_ids,
                size: filteredData.sample_values,
                colorscale: "Portland"
            }
        };

        var data = [trace1];

        var layout1 = {
            title: 'Samples Found',
            xaxis: {
                title: {
                  text: "OTU ID's",
                },
              },

            yaxis: {
                title: {
                  text: 'Sample Values',
                },
              },
        };

        let config1 = {
            responsive: true
        }

        // Plotting Bubble Chart
        Plotly.newPlot('bubble', data, layout1, config1)

        filteredData[0]
        
        var metaData = resp.metadata[resp.names.indexOf(selectedID)]
        
        // Selecting Demographic Info
        let panel = d3.select("#sample-metadata")
        panel.html("")

        // Adding Demographic Info
        for (key in metaData) {
            panel.append("h6").text(`${key.toUpperCase()}: ${metaData[key]}`)
        }
    });

}

