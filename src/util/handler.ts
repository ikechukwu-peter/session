import { Request, Response, NextFunction } from 'express';

let deleteOne = (Model: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
  
      if (!doc) {
        return res.status(404).json({
          status: "fail",
          message: "No document found",
        });
      }
  
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Something went wrong, try again",
      });
    }
  };
  
  let updateOne = (Model: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!doc) {
        return res.status(404).json({
          status: "fail",
          message: "No document found with that ID",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        err,
        message: "Something went wrong, try again",
      });
    }
  };
  
  let createOne = (Model: any) => async (req: Request, res: Response) => {
    try {
      const doc = await Model.create(req.body);
  
      res.status(201).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Something went wrong, try again",
      });
    }
  };
  
  let getOne = (Model: any) => async (req: Request, res: Response) => {
    try {
      const doc = await Model.findById(req.params.id);
  
      if (!doc) {
        return res.status(404).json({
          status: "fail",
          message: "No document found with that ID",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          doc,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Something went wrong, try again",
      });
    }
  };
  
  let getAll = (Model : any) => async (req: Request, res: Response) => {
    try {
      const doc = await Model.find();
  
      // SEND RESPONSE
      res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
          doc,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Something went wrong, try again",
      });
    }
  };

  export {
      deleteOne, createOne, updateOne, getOne, getAll
  }
  