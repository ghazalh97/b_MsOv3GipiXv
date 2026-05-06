// LocalStorage utilities for Goal Tracker

const GOALS_KEY = 'goals'
const USER_STATS_KEY = 'userStats'
const DEFAULT_STATS = {
  xpTotal: 0,
  streak: 0,
  completedCount: 0,
  lastActivityDate: null,
}

export const getGoals = () => {
  const stored = localStorage.getItem(GOALS_KEY)
  return stored ? JSON.parse(stored) : []
}

export const saveGoals = (goals) => {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals))
}

export const getGoal = (id) => {
  const goals = getGoals()
  return goals.find(g => g.id === id)
}

export const addGoal = (goal) => {
  const goals = getGoals()
  const newGoal = {
    ...goal,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    logs: [],
  }
  goals.push(newGoal)
  saveGoals(goals)
  return newGoal
}

export const updateGoal = (id, updates) => {
  const goals = getGoals()
  const index = goals.findIndex(g => g.id === id)
  if (index !== -1) {
    goals[index] = {
      ...goals[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    saveGoals(goals)
    return goals[index]
  }
  return null
}

export const deleteGoal = (id) => {
  const goals = getGoals()
  const filtered = goals.filter(g => g.id !== id)
  saveGoals(filtered)
}

export const addProgressLog = (goalId, amount = 1) => {
  const goal = getGoal(goalId)
  if (!goal) return null

  const today = new Date().toISOString().split('T')[0]
  const existingLog = goal.logs.find(log => log.date === today)

  if (existingLog) {
    existingLog.amount += amount
  } else {
    goal.logs.push({ date: today, amount })
  }

  goal.progress = goal.logs.reduce((sum, log) => sum + log.amount, 0)

  // Check if goal is completed
  if (goal.progress >= goal.target && goal.status !== 'completed') {
    goal.status = 'completed'
    updateUserStats(stats => ({
      ...stats,
      xpTotal: stats.xpTotal + 100,
      completedCount: stats.completedCount + 1,
    }))
  } else if (goal.progress < goal.target && goal.status === 'completed') {
    goal.status = 'active'
  }

  // Add XP for logging progress
  updateUserStats(stats => ({
    ...stats,
    xpTotal: stats.xpTotal + 20,
  }))

  updateGoal(goal.id, goal)
  updateStreak(today)
  return goal
}

export const getUserStats = () => {
  const stored = localStorage.getItem(USER_STATS_KEY)
  return stored ? JSON.parse(stored) : DEFAULT_STATS
}

export const updateUserStats = (updater) => {
  const stats = getUserStats()
  const updated = typeof updater === 'function' ? updater(stats) : { ...stats, ...updater }
  localStorage.setItem(USER_STATS_KEY, JSON.stringify(updated))
  return updated
}

export const updateStreak = (date) => {
  const stats = getUserStats()
  const today = date || new Date().toISOString().split('T')[0]
  const lastActivity = stats.lastActivityDate

  if (lastActivity === today) return stats

  const lastActivityDate = new Date(lastActivity)
  const currentDate = new Date(today)
  const diffTime = currentDate - lastActivityDate
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  let newStreak = stats.streak
  if (diffDays === 1) {
    newStreak += 1
  } else if (diffDays > 1) {
    newStreak = 1
  }

  return updateUserStats({
    ...stats,
    streak: newStreak,
    lastActivityDate: today,
  })
}

export const resetAllData = () => {
  localStorage.removeItem(GOALS_KEY)
  localStorage.removeItem(USER_STATS_KEY)
}
