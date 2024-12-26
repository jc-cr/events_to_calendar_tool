let events = [];
const form = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');
const exportCsvBtn = document.getElementById('exportCsvBtn');
const addEventBtn = document.getElementById('addEventBtn');
const subjectInput = document.getElementById('subject');
const startDateInput = document.getElementById('startDate');

// Add input event listeners to required fields
subjectInput.addEventListener('input', updateAddEventBtn);
startDateInput.addEventListener('input', updateAddEventBtn);

// Function to check if required fields are filled
function updateAddEventBtn() {
    const hasSubject = subjectInput.value.trim() !== '';
    const hasStartDate = startDateInput.value !== '';
    addEventBtn.disabled = !(hasSubject && hasStartDate);
}

// Initial check for button state
updateAddEventBtn();

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate required fields again
    if (!subjectInput.value.trim() || !startDateInput.value) {
        return;
    }
    
    const newEvent = {
        subject: subjectInput.value.trim(),
        startDate: startDateInput.value,
        startTime: document.getElementById('startTime').value,
        endDate: document.getElementById('endDate').value,
        endTime: document.getElementById('endTime').value,
        timezone: document.getElementById('timezone').value,
        description: document.getElementById('description').value.trim()
    };

    events.push(newEvent);
    updateEventList();
    form.reset();
    exportCsvBtn.disabled = false;
    updateAddEventBtn(); // Reset button state after form reset
});

function updateEventList() {
    if (events.length === 0) {
        eventList.innerHTML = '<div class="empty-state">No events added yet</div>';
        return;
    }

    eventList.innerHTML = events
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        .map((event, index) => `
            <div class="event-card" style="--depth: ${index}">
                <h3>${event.subject}</h3>
                <div class="event-time">
                    ${formatEventDateTime(event)}
                </div>
                ${event.description ? `
                    <div class="event-description">${event.description}</div>
                ` : ''}
            </div>
        `).join('');
}

function formatEventDateTime(event) {
    const options = { timeZone: event.timezone };
    let dateStr = new Date(event.startDate).toLocaleDateString(undefined, options);
    
    if (event.startTime) {
        dateStr += ' ' + event.startTime;
    }
    
    if (event.endDate || event.endTime) {
        dateStr += ' - ';
        if (event.endDate) {
            dateStr += new Date(event.endDate).toLocaleDateString(undefined, options);
        }
        if (event.endTime) {
            dateStr += ' ' + event.endTime;
        }
    }
    
    dateStr += ` (${event.timezone})`;
    return dateStr;
}

exportCsvBtn.addEventListener('click', function() {
    const headers = ['Subject', 'Start Date', 'Start Time', 'End Date', 'End Time', 'Description', 'Timezone'];
    const csvContent = [
        headers.join(','),
        ...events.map(event => [
            `"${event.subject}"`,
            event.startDate,
            event.startTime,
            event.endDate || event.startDate,
            event.endTime,
            `"${event.description}"`,
            event.timezone
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calendar-events.csv';
    a.click();
    window.URL.revokeObjectURL(url);
});