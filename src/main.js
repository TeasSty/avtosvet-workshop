const asset = (file) => `${import.meta.env.BASE_URL}images/${file}`

const cases = {
  rav4: {
    title: 'Toyota RAV4',
    items: [
      'Комфортные Bi-LED модули Lightway',
      'Лёгкая полировка',
      'Регулировка на стенде',
    ],
    images: [
      asset('case-rav4-1.jpg'),
      asset('case-rav4-2.jpg'),
      asset('case-rav4-3.jpg'),
    ],
    alts: [
      'Установленная фара на кузове кроссовера',
      'Вскрытая фара с модулем на верстаке',
      'Линза Bi-LED модуля',
    ],
  },
  carnival: {
    title: 'Kia Carnival',
    items: [
      'Наборные Bi-LED модули Luxsar',
      'Лёгкая полировка',
      'Регулировка на стенде',
    ],
    images: [
      asset('case-carnival-1.jpg'),
      asset('case-carnival-2.jpg'),
      asset('case-carnival-3.jpg'),
    ],
    alts: [
      'Установленная фара на кузове минивэна',
      'Наборные модули в открытом корпусе',
      'Ночной пучок со ступенчатой границей',
    ],
  },
  aqua: {
    title: 'Toyota Aqua',
    items: [
      'Комфортные Bi-LED модули Lightway',
      'Лёгкая полировка',
      'Регулировка на стенде',
    ],
    images: [
      asset('case-aqua-1.jpg'),
      asset('case-aqua-2.jpg'),
      asset('case-aqua-3.jpg'),
    ],
    alts: [
      'Установленная фара на компактном хэтчбеке',
      'Модуль и герметик на верстаке',
      'Корпуса и стёкла фар в боксе',
    ],
  },
}

const year = document.getElementById('year')
if (year) year.textContent = String(new Date().getFullYear())

const caseImg = document.getElementById('case-img')
const caseTitle = document.querySelector('.case-meta h3')
const caseList = document.querySelector('.case-list')
const thumbs = [...document.querySelectorAll('.thumb')]
const chips = [...document.querySelectorAll('.case-chip')]

function setThumbs(data) {
  thumbs.forEach((thumb, i) => {
    const src = data.images[i] || data.images[0]
    thumb.dataset.src = src
    thumb.dataset.alt = data.alts[i] || data.alts[0]
    thumb.style.backgroundImage = `url("${src}")`
    thumb.classList.toggle('is-active', i === 0)
    thumb.setAttribute('aria-selected', i === 0 ? 'true' : 'false')
  })
}

function renderCase(id) {
  const data = cases[id]
  if (!data || !caseImg || !caseTitle || !caseList) return
  caseTitle.textContent = data.title
  caseList.innerHTML = data.items.map((item) => `<li>${item}</li>`).join('')
  caseImg.src = data.images[0]
  caseImg.alt = data.alts[0]
  setThumbs(data)
  chips.forEach((chip) => {
    chip.classList.toggle('is-active', chip.dataset.caseId === id)
  })
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => renderCase(chip.dataset.caseId))
})

thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    if (!caseImg) return
    caseImg.src = thumb.dataset.src
    if (thumb.dataset.alt) caseImg.alt = thumb.dataset.alt
    thumbs.forEach((t) => {
      const active = t === thumb
      t.classList.toggle('is-active', active)
      t.setAttribute('aria-selected', active ? 'true' : 'false')
    })
  })
})

const form = document.getElementById('booking-form')
const status = document.getElementById('form-status')

form?.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const name = String(data.get('name') || '').trim()
  const phone = String(data.get('phone') || '').trim()
  const car = String(data.get('car') || '').trim()
  const task = String(data.get('task') || '').trim()

  if (!name || !phone || !car) {
    if (status) status.textContent = 'Заполните имя, телефон и авто.'
    return
  }

  const text = [
    'Заявка с сайта Avtosvet Workshop',
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Авто: ${car}`,
    task ? `Задача: ${task}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const vk = `https://vk.ru/write-220627691`
  window.open(vk, '_blank', 'noopener')
  if (status) {
    status.textContent =
      'Откроется диалог VK. Если не открылся — напишите +7 995 044-04-95.'
  }
  try {
    navigator.clipboard?.writeText(text)
  } catch {
    /* ignore */
  }
  form.reset()
})

const railItems = document.querySelectorAll('.service-rail li')
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )
  railItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 60}ms`
    io.observe(item)
  })
} else {
  railItems.forEach((item) => item.classList.add('is-in'))
}

/* Ensure visible if observer never fires (e.g. already in view) */
requestAnimationFrame(() => {
  railItems.forEach((item) => {
    const rect = item.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9) item.classList.add('is-in')
  })
})
