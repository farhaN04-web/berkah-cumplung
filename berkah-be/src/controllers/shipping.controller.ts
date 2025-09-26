import { Request, Response, NextFunction } from "express";
import axios from "axios";

export class ShippingController {
static async getShippingCost(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { destination, weight, courier } = req.body;

    if (!destination || !weight || !courier) {
        res.status(400).json({
    status: "error",
    message: "Destination, weight, and courier are required",
        });
        return;
    }
    const PURBALINGGA_CITY_ID = "372"; 

    const response = await axios.post(
        "https://api.rajaongkir.com/starter/cost",
        `origin=${PURBALINGGA_CITY_ID}&destination=${destination}&weight=${weight}&courier=${courier}`,
        {
        headers: {
            key: process.env.RAJAONGKIR_API_KEY, // Simpan API Key di file .env
            "content-type": "application/x-www-form-urlencoded",
        },
        }
    );

    if (response.data.rajaongkir.status.code !== 200) {
        throw new Error(response.data.rajaongkir.status.description);
    }
    
    const results = response.data.rajaongkir.results[0].costs;

    res.status(200).json({
        status: "success",
        message: "Shipping cost retrieved successfully",
        data: results,
    });
    } catch (error) {
    next(error);
    }
}
}