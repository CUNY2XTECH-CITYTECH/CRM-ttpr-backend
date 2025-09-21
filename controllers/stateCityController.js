import { catchAsync, readAndParseFileToJSON } from "../utils/commonFunctions.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const states_json = path.join(__dirname, '../static-data/states.json');
const city_json = path.join(__dirname, '../static-data/US_States_and_Cities.json');

export const getCities = catchAsync(async (req, res, next) => {
  // Read the JSON file
  const cities_dict = await readAndParseFileToJSON(city_json);
  const cities = Object.values(cities_dict).flat().slice(0, 30)
  res.status(200).json(
    cities
  );
});
export const getCitySuggestions = catchAsync(async (req, res, next) => {
  const all_cities = await readAndParseFileToJSON(city_json);
  const query_list = req.params.id?.split(" ")
  const query = query_list.map((e) => e[0].toUpperCase() + e.slice(1)).join(" ")
  const filtered_cites = all_cities[query]

  // Return empty array if query is too short
  if (query.length < 2) {
    return res.json({ suggestions: [] });
  }
  res.json({
    data:
      filtered_cites
  });
}
)

export const getStates = catchAsync(async (req, res, next) => {
  // Read the JSON file
  const cities = await readAndParseFileToJSON(states_json)
  res.status(200).json(
    cities
  );
});
