var SessionClient = function(name, plural, store, client) {

  var launch = function(id, callback) {
    client.put(plural + '/launch', id, {}, function(data) {
      store.dispatch({
        type: "UPDATE_SESSION",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var pause = function(id, callback) {
    client.put(plural + '/pause', id, {}, function(data) {
      store.dispatch({
        type: "UPDATE_SESSION",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var nextRound = function(id, callback) {
    client.put(plural + '/next-round', id, {}, function(data) {
      store.dispatch({
        type: "UPDATE_SESSION",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var room = function(id, callback) {
    client.put(plural + "/room", id, {}, function(data) {
      store.dispatch({
        type: "UPDATE_SESSION",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var scenario = function(id, callback) {
    client.put(plural + "/scenario", id, {}, function(data) {
      store.dispatch({
        type: "UPDATE_SESSION",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var clues = function(id, callback) {
    client.put(plural + "/clues", id, {}, function(data) {
      store.dispatch({
        type: "UPDATE_SESSION",
        session: data
      })
      if (callback) callback(data)
    })
  }

  var checkCode = function(session_id, code, callback) {
    client.put(plural + "/code", session_id + "/" + code, {}, function(data) {
      if (callback) callback(data)
    })
  }

  var setUserScores = function(session_id, user_id, scores, callback) {
    client.put(plural, session_id + "/scores/" + user_id, {scores: JSON.stringify(scores)}, function(data) {
      store.dispatch({
        type: "UPDATE_SESSION",
        session: data
      })

      if (callback) callback(data)
    })
  }

  var invite = function(session, user, callback) {
    client.put(plural, session.id + "/invite/" + user.id, {}, function(data) {
      store.dispatch({
        type: "UPDATE_SESSION",
        session: data
      })

      if (callback) callback(data)
    })
  }

  var inviteAll = function(session, user, callback) {
    client.put(plural, session.id + "/invite", {}, function(data) {
      store.dispatch({
        type: "UPDATE_SESSION",
        session: data
      })

      if (callback) callback(data)
    })
  }

  var doPing = function(session, callback) {
    client.get(plural + "/ping/" + session.id, function(data) {
      if (callback) callback(data)
    })
  }

  var pushInState = function(session) {
    store.dispatch({
      type: "UPDATE_SESSION",
      session: session
    })
  }

  return {
    launch: launch,
    pause: pause,
    nextRound: nextRound,
    room: room,
    scenario: scenario,
    clues: clues,

    checkCode: checkCode,
    setUserScores: setUserScores,

    invite: invite,
    inviteAll: inviteAll,

    doPing: doPing,

    pushInState: pushInState
  }

}

export default SessionClient
