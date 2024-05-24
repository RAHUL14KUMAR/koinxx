const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const csvModel = require("../Schema/CSVSchema");

const uploading = async (req, res) => {
  try {

    if (!req.file) {
      res.status(400);
      throw new Error("Please upload a file");
    }

    const filePath = path.join("uploads", req.file.filename);

    const extension = path.extname(req.file.originalname).toLowerCase();

    if (extension !== ".csv") {
      throw new Error("please upload csv file");
    }

    let stripBomStream;
    try {
      stripBomStream = (await import("strip-bom-stream")).default;
    } catch (error) {
      return res.status(500).send("Error loading strip-bom-stream.");
    }

    fs.createReadStream(filePath)
      .pipe(stripBomStream())
      .pipe(csv())
      .on("data", async (row) => {
        const values = Object.values(row);
        const [base,quote]=row.Market.split("/");

        const csvDetail = await csvModel.create({
          User_ID:row.User_ID,
          UTC_Time:row.UTC_Time,
          Operation:row.Operation,
          Opertion_amount:values[4],
          Market:row.Market,
          BaseCoin:base,
          QuoteCoin:quote,
          Price:row.Price
        });
      })
      .on("end", async () => {
        fs.unlinkSync(filePath);
        return res.status(200).json("file has been uploaded successfully and data uploaded sucessfully");
      });
  } catch (err) {
    return res.status(500).send(err.stack);
  }
};

module.exports = {
  uploading,
};
