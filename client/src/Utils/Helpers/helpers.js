export const formatDate = dateString => {
    const date = new Date(dateString)
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    if (day < 10) {
        day = `0${day}`
    }
    if (month < 10) {
        month = `0${month}`
    }

    return `${year}-${day}-${month}`
}

export const formatTimeline = (reports) => {
    const timeline = reports.map(report => {
        const procedures = report[1].map(r => {
            return `-${r.objectType}`
        })
        return {
            title: report[0],
            cardTitle: ` ${report[0]} Summary`,
            cardSubtitle: `Total health data points created this year: ${report[1].length}`,
            cardDetailedText: procedures,
        }
    })

    return timeline
}