class HttpServiceMock {
  startRoutine ({ id }) {
    return {
      data: {
        id: 10
      }
    }
  }

  stopRunningRoutine () {
    return {}
  }

  createRoutine (routine) {
    return {
      data: {
        data: {
          id: 1,
          ...routine
        }
      }
    }
  }

  updateRoutine (routine) {
    return {
      data: {
        data: routine
      }
    }
  }

  removeRoutine (routine) {
    return {}
  }

  systemRestart () {
    return {}
  }

  pushAcid () {
    return {}
  }

  testAcidDrop () {
    return {}
  }

  pushBase () {
    return {}
  }

  testBaseDrop () {
    return {}
  }

  getRoutineReadings (routine) {
    return {
      data: {
        data: [{ temp: 10 }, { temp: 11 }]
      }
    }
  }

  getRoutineCalculations (routine) {
    return {
      data: {
        data: {
          biomassPerformance: []
        }
      }
    }
  }

  getRoutineLogEntries (routine) {
    return {
      data: {
        data: [{ id: 1 }, { id: 2 }]
      }
    }
  }
}

export default new HttpServiceMock()
