// البيانات الخاصة بكل يوم
const daysData = {
    "السبت": [
     { subject: "رياضيات", time: "03:00:00" },
     { subject: "كيمياء", time: "02:30:00" },
     { subject: "قرآن", time: "01:00:00" },
     { subject: "تفسير", time: "01:30:00" }
 ],
 "الأحد": [
     { subject: "فيزياء", time: "03:00:00" },
     { subject: "أحياء", time: "02:30:00" },
     { subject: "حديث", time: "01:30:00" },
     { subject: "صرف", time: "01:00:00" }
 ],
 "الاثنين": [
     { subject: "رياضيات", time: "03:00:00" },
     { subject: "كيمياء", time: "02:30:00" },
     { subject: "فقه", time: "01:00:00" }
 ],
 "الثلاثاء": [
     { subject: "فيزياء", time: "03:00:00" },
     { subject: "أحياء", time: "02:30:00" },
     { subject: "بلاغة", time: "01:30:00" },
     { subject: "توحيد", time: "01:00:00" }
 ],
 "الأربعاء": [
     { subject: "رياضيات", time: "03:00:00" },
     { subject: "كيمياء", time: "02:30:00" },
     { subject: "حديث", time: "01:30:00" }
 ],
 "الخميس": [
     { subject: "فيزياء", time: "03:00:00" },
     { subject: "أحياء", time: "02:30:00" },
     { subject: "صرف", time: "01:00:00" },
     { subject: "نحو", time: "01:30:00" }
 ],
 "الجمعة": [
     { subject: "رياضيات", time: "03:00:00" },
     { subject: "كيمياء", time: "02:30:00" },
     { subject: "أحياء", time: "02:00:00" },
     { subject: "تفسير", time: "01:30:00" }
 ]
 // يمكنك إضافة المزيد من الأيام والمواد هنا
};

// وظيفة لعرض الجدول بناءً على اليوم الحالي
function loadPlanner() {
 const today = new Date().toLocaleString('ar-EG', { weekday: 'long' });
 const subjects = daysData[today] || [];

 let tableHTML = `<table>
     <tr>
         <th>المادة</th>
         <th>الوقت المتبقي</th>
         <th>التحكم بالمؤقت</th>
     </tr>`;

 subjects.forEach((subject, index) => {
     tableHTML += `
     <tr>
         <td>${subject.subject}</td>
         <td><span class="timer" id="timer-${index}" data-time="${subject.time}">${subject.time}</span></td>
         <td>
             <button class="start" onclick="startTimer(${index})">تشغيل</button>
             <button class="stop" onclick="stopTimer(${index})">إيقاف</button>
         </td>
     </tr>`;
 });

 tableHTML += `</table>`;
 document.getElementById('planner').innerHTML = tableHTML;
}

// المتغيرات التي ستخزن الموقتات
let timers = [];

// وظيفة لبدء المؤقت
function startTimer(index) {
 const timerElement = document.getElementById(`timer-${index}`);
 let [hours, minutes, seconds] = timerElement.getAttribute('data-time').split(':').map(Number);

 // منع وجود أكثر من مؤقت واحد نشط
 if (timers[index]) return;

 timers[index] = setInterval(() => {
     if (seconds === 0) {
         if (minutes === 0) {
             if (hours === 0) {
                 timerElement.textContent = "انتهى الوقت!";
                 clearInterval(timers[index]);
                 return;
             }
             hours--;
             minutes = 59;
             seconds = 59;
         } else {
             minutes--;
             seconds = 59;
         }
     } else {
         seconds--;
     }

     // تحديث المؤقت
     timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
     timerElement.setAttribute('data-time', `${hours}:${minutes}:${seconds}`);
 }, 1000);
}

// وظيفة لإيقاف المؤقت
function stopTimer(index) {
 clearInterval(timers[index]);
 timers[index] = null;
}

// وظيفة لعرض الساعة في الوقت الفعلي
function updateClock() {
 const now = new Date();
 const time = now.toLocaleTimeString('ar-EG');
 const date = now.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

 document.getElementById('time').textContent = time;
 document.getElementById('date').textContent = date;
}

// تحديث الساعة كل ثانية
setInterval(updateClock, 1000);

// تحميل الجدول عند تحميل الصفحة
window.onload = function() {
 loadPlanner();  // استدعاء وظيفة الجدول
 updateClock();  // استدعاء وظيفة الساعة
};
