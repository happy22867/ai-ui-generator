let versions = [];

function saveVersion(tree) {
  // Save a deep copy to prevent mutation
  versions.push(JSON.parse(JSON.stringify(tree)));
}

function getVersion(index) {
  return versions[index] ? JSON.parse(JSON.stringify(versions[index])) : null;
}

function getAllVersions() {
  return versions.map(v => JSON.parse(JSON.stringify(v)));
}

function deleteVersion(index) {
  if (index >= 0 && index < versions.length) {
    versions.splice(index, 1); // remove 1 element at given index
  }
}

module.exports = { saveVersion, getVersion, getAllVersions, deleteVersion };
