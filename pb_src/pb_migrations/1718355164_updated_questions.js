/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9")

  collection.listRule = "quizzes_via_questions.isFree ?= true || @request.auth.registeredCourses.quizzes.questions.id ?= id"
  collection.viewRule = "quizzes_via_questions.isFree ?= true || @request.auth.registeredCourses.quizzes.questions.id ?= id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9")

  collection.listRule = "quizzes_via_questions.isFree ?= true || @request.auth.registeredCourses.quizzes.questions.id ~ id"
  collection.viewRule = "quizzes_via_questions.isFree ?= true || @request.auth.registeredCourses.quizzes.questions.id ~ id"

  return dao.saveCollection(collection)
})
