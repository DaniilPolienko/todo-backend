const e = require("express");
const Router = e.Router();
const { body } = require("express-validator");
const { Task } = require("../../models");
const authorization = require("../../middlewear/authorization");
const validate = require("../../validation");
const { Op } = require("sequelize");

const patch = Router.patch("/item", authorization, async (req, res) => {
  try {
    validate(req);
    const source = req.body.source;
    const destination = req.body.destination;

    const range = (start, end) => {
      let ans = [];
      for (let i = start; i <= end; i++) {
        ans.push(i);
      }
      return ans;
    };
    const indexes = range(req.body.source, req.body.destination - 1);

    console.log(indexes);
    // const draggedItem = await Task.findOne({
    //   where: { uuid: res.locals.id, index: req.body.source },
    // });
    // draggedItem.index = req.body.destination;
    // await draggedItem.save();

    const offset = source < destination ? source : destination;

    const allItems = await Task.findAll({
      where: {
        uuid: res.locals.id,
        index: {
          [Op.between]: [
            offset + 1,
            source < destination ? destination : source,
          ],
        },
      },
    });

    const currentItem = await Task.findOne({
      where: {
        uuid: res.locals.id,
        index: source < destination ? source : destination,
      },
    });

    for (let i = offset; i < allItems.length + offset; i++) {
      console.log(req.body.destination);
      console.log(req.body.source);
      const newTask = await Task.findOne({
        where: {
          uuid: res.locals.id,
          index: i + 1,
        },
      });
      // console.log("newTask", newTask);
      newTask.index -= 1;
      const saveTask = await newTask.save();
      // console.log("saveTask", saveTask);
    }

    currentItem.index = source < destination ? destination : source;
    await currentItem.save();
    // for (let i = 0; i < indexes.length; i++) {
    //   console.log(i);
    //   const item = await Task.findOne({
    //     where: {
    //       uuid: res.locals.id,
    //       index: i,
    //     },
    //   });
    //   console.log("??????????", item);
    //   item.index = item.index - 1;
    //   item.save();

    //   for (let i = 0; i < allItems.length; i++) {
    //     const item = await Task.update({
    //       where: {},
    //     });
    //   }
    // await Task.Update({
    //   index: i,
    //   where: {
    //     uuid: res.locals.id,
    //     index: {
    //       [Op.between]: [req.body.source, req.body.destination],
    //     },
    //   },
    // });
    // const updatedItems = await Task.Update({
    //     index: index-1,
    //     where: {
    //       uuid: res.locals.id,
    //       index: {
    //         [Op.between]: [req.body.source, req.body.destination],
    //       },
    //     },
    //   });
    //console.log(allItems, draggedItem);

    //console.log(updatedItems);
    // allItems.map((el, index) =>
    //   index !== allItems.length - 1
    //     ? (el.dataValues.index = el.dataValues.index - 1)
    //     : console.log("no")
    // );
    // await allItems.save();
    // console.log(allItems[0].dataValues.index);
    //allItems.forEach((el) => (el.index = el.index - 1));
    //await allItems.save();
    //console.log(allItems);
    // console.log("????????", updatedItem);
    // const updatedItems = await Task.Update({
    //   index: index - 1,
    //   where: {
    //     uuid: res.locals.id,
    //     index: {
    //       [Op.between]: [req.body.source, req.body.destination],
    //     },
    //   },
    // });
    //console.log("))))))))", updatedItems);
    //  res.send(updatedItem);

    // allItems.map((el, index) =>
    //   index !== allItems.length - 1
    //     ? (el.dataValues.index = el.dataValues.index - 1)
    //     : console.log("no")
    // );
    // await allItems.save();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = patch;
