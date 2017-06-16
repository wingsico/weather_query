
const head = document.head,
  cityName = document.querySelector('.today-title .city'),
  today = document.querySelector('.today'),
  future = document.querySelector('.future'),
  script = document.createElement('script'),
  mask = document.getElementById('mask'),
  initialQueryVal = document.querySelector('#mask .search-input'),
  initialQueryBut = document.querySelector('#mask .search-button'),
  // queryVal = document.querySelector('.search .search-input'),
  // queryBut = document.querySelector('.search .search-button'),
  todayIndex = {
    temperature: today.querySelector('.temperature'),
    weather: today.querySelector('.weather'),
    // icon: today.querySelector('i'),
    date: today.querySelector('.date-y'),
    week: today.querySelector('.week'),
    wind: today.querySelector('.wind'),
    windStrength: today.querySelector('.wind-strength'),
    humidity: today.querySelector('.humidity'),
    dressingIndex: today.querySelector('.dressing-index'),
    washIndex: today.querySelector('.wash-index'),
    travelIndex: today.querySelector('.travel-index'),
    exerciseIndex: today.querySelector('.exercise-index'),
    uvIndex: today.querySelector('.uv-index')
  },
  futureIndex = {
    date: future.querySelectorAll('.date'),
    weather: future.querySelectorAll('.weather'),
    icon: future.querySelectorAll('i'),
    temperature: future.querySelectorAll('.temperature'),
    wind: future.querySelectorAll('.wind'),
    week: future.querySelectorAll('.week')
  },
  length = futureIndex.date.length

head.appendChild(script)

function getJSON(url) {
  script.src = url
}

function dataUpdating(json) {
  var result = json.result

  // 今日
  todayDataUpdating(result)

  // 未来六日
  futureDataUpdating(result)
}

function todayDataUpdating(result) {
  cityName.innerHTML = result.today.city
  todayIndex.temperature.innerHTML = result.sk.temp + '℃'
  todayIndex.weather.innerHTML = result.today.weather
  todayIndex.dressingIndex.innerHTML = result.today.dressing_index
  todayIndex.travelIndex.innerHTML = result.today.travel_index
  todayIndex.uvIndex.innerHTML = result.today.uv_index
  todayIndex.washIndex.innerHTML = result.today.wash_index
  todayIndex.humidity.innerHTML = result.sk.humidity
  todayIndex.date.innerHTML = result.today.date_y
  todayIndex.wind.innerHTML = result.today.wind
  todayIndex.windStrength.innerHTML = result.sk.wind_strength
  todayIndex.week.innerHTML = result.today.week
  todayIndex.exerciseIndex.innerHTML = result.today.exercise_index
  // setTodayIcon(result.today.weather_id.fa)
}

function futureDataUpdating(result) {
  for (var i = 0; i < length; i++) {
    var _date = result
      .future[i + 1]
      .date
      .split('')
      .splice(4, 2)
      .join('') + '月' + result
      .future[i + 1]
      .date
      .split('')
      .splice(6, 2)
      .join('') + '日'
    futureIndex.date[i].innerHTML = _date
    futureIndex.weather[i].innerHTML = result.future[i + 1].weather
    futureIndex.temperature[i].innerHTML = result.future[i + 1].temperature
    futureIndex.week[i].innerHTML = result.future[i + 1].week
    futureIndex.wind[i].innerHTML = result.future[i + 1].wind
    setFutureIcon(result.future[i + 1].weather_id.fa, i)
  }
}


/*
  0 - 晴
  1 -多云 和阴
  3 - 阵雨
  4 - 雷阵雨
  6 - 雨夹雪
  7 - 小雨
  8 - 中雨
  9 - 大雨
  10 - 暴雨
  11 - 大暴雨
  12 - 特大暴雨
  13 - 阵雪
  14 - 小雪
  15 - 中雪
  16 - 大雪
  17 - 暴雪
  18 - 雾
  19 - 冻雨
  20 - 沙城暴
  29 - 浮尘
  30 - 扬沙
  53 - 霾
*/
function weatherType(id) {
  var wid = Number(id) || 0
  switch (wid) {
    case 2:
      wid = wid - 1
      break
    case 5:
      wid = wid - 1
      break
    case 21 :
      wid = wid - 14
      break
    case 22:
      wid = wid - 14
      break
    case 23:
      wid = wid - 14
      break
    case 24:
      wid = wid - 14
      break
    case 25:
      wid = wid - 14
      break
    case 26:
      wid = wid - 12
      break
    case 27:
      wid = wid - 12
      break
    case 28:
      wid = wid - 12
      break
    case 20:
      wid = 20
      break
    case 31:
      wid = 20
      break
    default:
      wid = wid
  }
  return wid
}


// function setTodayIcon(id){
//   var wid = weatherType(id)
//   todayIndex.icon.className = 'today-' + wid
// }

function setFutureIcon(id, i){
  var wid = weatherType(id)
  futureIndex.icon[i].className = 'future-' + wid
}

initialQueryBut.onclick = function () {
  var city = initialQueryVal.value
  var url = 'http://v.juhe.cn/weather/index?format=2&cityname=' + city + '&key=f8485e4ace6f1d8a6307a2d8bfcb1502&callback=dataUpdating'
  mask.style.display = 'none'
  getJSON(url)
}

// queryBut.onclick = function(){
//   console.log(1)
//   var city = queryVal.value
//   var url = 'http://v.juhe.cn/weather/index?format=2&cityname=' + city + '&key=f8485e4ace6f1d8a6307a2d8bfcb1502&callback=dataUpdating'
//   getJSON(url)  
// }