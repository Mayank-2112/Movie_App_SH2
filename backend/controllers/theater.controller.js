import Theater from "../models/theater.model.js";

export const saveTheater = async (req,res,next)=>{
    const theaters = req.body;

    try {
        const query = `
          INSERT INTO theaters (theaterId, theaterName, theaterAddress, theaterCity)
          VALUES ($1, $2, $3, $4)
        `;
    
        for (const theater of theaters) {
          await Theater.query(query, [
            theater.theaterId,
            theater.theaterName,
            theater.theaterAddress,
            theater.theaterCity,
          ]);
        }
    
        res.status(200).send('Theaters saved successfully!');
      } catch (err) {
        console.error('Error saving theaters:', err);
        res.status(500).send('Failed to save theaters');
      }
}