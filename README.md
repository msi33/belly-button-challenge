# belly-button-challenge: Module 14 Challenge

**Background**
In this challenge the expectation is to build an interactive dashboard to explore the Belly Button Biodiversity dataset Links to an external site.This is based on catalogs of the microbes that colonize human navels.The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare. Using provided data and starter code

**Part 1**
1. Initially use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.
2. Then create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
3. Use sample_values as the values for the bar chart.
4. Use otu_ids as the labels for the bar chart.
5. Use otu_labels as the hovertext for the chart.

**Part 2**
1. Create a bubble chart that displays each sample.
2. Use otu_ids for the x values.
3. Use sample_values for the y values.
4. Use sample_values for the marker size.
5. Use otu_ids for the marker colors.
6. Use otu_labels for the text values.

**Part 3**
1. Display the sample's metadata, i.e., an individual's demographic information.
2. Loop through each key-value pair from the metadata JSON object and create a text string.
3. Append an html tag with that text to the #sample-metadata panel.

Note: Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. Expected output was provided


