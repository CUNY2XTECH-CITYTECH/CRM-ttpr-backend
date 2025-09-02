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
  const cities = Object.values(cities_dict).flat().slice(0,30)
  res.status(200).json(
    cities
  );
});
export const getCitySuggestions = catchAsync(async (req, res, next) => {
  const {state} = req.body; 
  const data = await fs.readFile(city_json, 'utf-8');
  const cities = JSON.parse(data);
   const arr = cities[state]
  const query = req.params.id?.toString().toLowerCase() || '';

  console.log('wow', cities[state],query)
  // Return empty array if query is too short
  if (query.length < 2) {
    return res.json({ suggestions: [] });
  }

  // Filter cities (case-insensitive search)
  const filteredCities = arr.filter(city =>
    city.toLowerCase().includes(query) 
  ).slice(0, 8); // Limit results

  // Format response
  const suggestions = filteredCities.map(city => ({
    data: city // Include full data
  }));

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  res.json({
    success: true,
    suggestions
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
