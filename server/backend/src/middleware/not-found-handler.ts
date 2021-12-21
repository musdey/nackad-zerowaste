import type * as express from "express";

export default function createNotFoundHandler(): express.RequestHandler {
	return async (req, res, next) => {
		const error = new Error(`Cannot ${req.method} ${req.path}`);

		return next(error);
	};
}