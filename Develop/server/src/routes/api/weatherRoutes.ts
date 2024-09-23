import { Router, type Request, type Response } from 'express';
const router = Router();

import weatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const cityName = req.body.cityName;
    weatherService.getWeatherForCity(cityName).then((data) => {
      historyService.addCity(cityName);
      res.json(data);
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/history', async (_req: Request, res: Response) => {
  try {
    const savedCities = await historyService.getCities();
    res.json(savedCities);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'City id is required' });
    }
    await historyService.removeCity(req.params.id);
    res.json({ success: 'City successfully removed from search history'});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
