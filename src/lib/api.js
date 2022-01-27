const FIREBASE_DOMAIN = "https://cv-database-858b7-default-rtdb.firebaseio.com";

export async function fetchCarForHome() {
  const response = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForManufacturerAndYear/988?year=2014&format=json"
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "sth wrong");
  }

  const fetchedData = data;
  return fetchedData;
}

export async function fetchCarListId() {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "sth wrong");
  }
  return data;
}

export async function fetchCarForDatabase(carForDatabase) {
  let url;
  if (carForDatabase.year === "all") {
    url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${carForDatabase.manufacturer}?format=json`;
  } else {
    url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${carForDatabase.manufacturer}/modelyear/${carForDatabase.year}?format=json`;
  }
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "sth wrong");
  }

  const fetchedData = data;
  return fetchedData;
}

export async function fetchFactoryForDatabase(factoryForDatabase) {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetEquipmentPlantCodes?year=${factoryForDatabase.year}&equipmentType=${factoryForDatabase.equipmentType}&reportType=${factoryForDatabase.reportType}&format=json`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "sth wrong");
  }

  const fetchedData = data;
  return fetchedData;
}

export async function addToFavs(savedData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/${savedData.username}/favs/${savedData.category}/${savedData.id}.json`,
    {
      method: "POST",
      body: JSON.stringify(savedData.savedData),
      headers: { "Content-type": "application/json" },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not save data");
  }
  return null;
}

export async function getDataInFavs(dataInFavs) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/${dataInFavs.username}/favs/${dataInFavs.category}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch favs");
  }
  return data;
}

export async function removeDataFromFavs(deleteData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/${deleteData.username}/favs/${deleteData.category}/${deleteData.id}.json`,
    {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "Content-type": "application/json" },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not delete fav.");
  }
  return null;
}
