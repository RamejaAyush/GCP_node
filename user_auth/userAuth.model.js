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
 * Create a new Dataset and returns its ID
 * @param {string} datasetName
 * @return {Promise<string>}
 */
const createDataset = async (datasetName) => {
  const [dataset] = await bigquery.createDataset(datasetName, location);
  console.log(`Dataset ${dataset.id} created.`);
  return dataset.id;
};

/*
 * Create a new table and returns its ID
 * @param {String} dataset ID
 * @param {string} The name of the table
 * @return {Promise<string>}
 */

const createTable = async (datasetId, tableName) => {
  // schema
  const schema = [
    { name: "id", type: "INTEGER", mode: "REQUIRED" },
    { name: "username", type: "STRING", mode: "REQUIRED" },
    { name: "password", type: "STRING", mode: "REQUIRED" },
    { name: "email", type: "STRING", mode: "REQUIRED" },
  ];

  const options = {
    location,
    schema,
  };

  // Creates a new BigQUery table
  const [table] = await bigquery
    .dataset(datasetId)
    .createTable(tableName, options);

  console.log(`Table ${table.id} created.`);
  return table.id;
};

/* Bundling the above functions */
const main = async () => {
  const datasetId = await createDataset("user_auth");
  await createTable(datasetId, "Users");
};

main();
