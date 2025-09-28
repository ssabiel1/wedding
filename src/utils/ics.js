export function createICSBlob({ title, start, end, location = '' }){
  const dt = s => new Date(s).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wedding//EN',
    'BEGIN:VEVENT',
    `UID:${crypto.randomUUID()}@wedding`,
    `DTSTAMP:${dt(new Date())}`,
    `DTSTART:${dt(start)}`,
    `DTEND:${dt(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  return new Blob([ics], { type: 'text/calendar;charset=utf-8' });
}
