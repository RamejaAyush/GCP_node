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
 * @Insert a certain set of rows into a table
 * @param {string} datasetID
 * @param {string} tavleID
 * @returns {Promise<void>}
 */

const insertRows = async (datasetId, tableId) => {
  const rows = [
    {
      id: 1,
      username: "test_user",
      password: "test@1234",
      EMAIL: "test@test123",
    },
    {
      id: 2,
      username: "test_user2",
      password: "test@1234",
      EMAIL: "test2@test123",
    },
  ];

  try {
    // insert the data
    await bigquery.dataset(datasetId).table(tableId).insert(rows);
    console.log(`Inserted ${rows.length} rows.`);
  } catch (e) {
    console.error(JSON.stringify(e, null, 2));
  }
};

insertRows("user_auth", "Users");
