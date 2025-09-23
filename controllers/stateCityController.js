import { catchAsync } from "../utils/commonFunctions.js";
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const states_json = path.join(__dirname, '../static-data/states.json');
const city_json = path.join(__dirname, '../static-data/US_States_and_Cities.json');

export const getCities = catchAsync(async (req, res, next) => {
  // Read the JSON file
  const data = await fs.readFile(city_json, 'utf-8');
  const cities_dict = JSON.parse(data);
  const cities = Object.values(cities_dict).flat().slice(0, 30)
  res.status(200).json(
    cities
  );
});
export const getCitySuggestions = catchAsync(async (req, res, next) => {
  const data = await fs.readFile(city_json, 'utf-8');
  const all_cities = JSON.parse(data);
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
  const data = await fs.readFile(states_json, 'utf-8');
  const cities = JSON.parse(data);
  res.status(200).json(
    cities
  );
});
