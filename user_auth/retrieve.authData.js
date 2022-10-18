const { BigQuery } = require("@google-cloud/bigquery");
// location of the project
const location = "US";

// creating a client
const bigquery = new BigQuery({
  // config file
  keyFilename: "../config/config.json",
  // project ID
  projectId: "node-api-365916",
});

/*
 * Get the data from the database
 * @param {string} ProjectId
 * @param {string} datasetId
 * @param {string} tableId
 * @returns {Promise<void>}
 */

const getData = async (projectId, datasetId, tableId) => {
  const query = `SELECT * from \`${projectId}.${datasetId}.${tableId}\` LIMIT 1000`;

  const options = {
    query: query,
    location,
  };

  // run the query
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // wait for the result
  const [rows] = await job.getQueryResults();

  // print the result
  console.log("Results Row");
  rows.forEach((row) => console.log(row));
};

getData("node-api-365916", "user_auth", "Users");
