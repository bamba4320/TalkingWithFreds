
class ErrorController{
    sendError(res, err) {
        console.error(err);
        if (err.message === "Not Found") {
          res.status(404).json({ Error: err.message });
        } else {
          res.status(400).json({ Error: err.message });
        }
      }
}



module.exports = new ErrorController();
