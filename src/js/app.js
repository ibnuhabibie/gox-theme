feather.replace()

var waitForFinalEvent = (function () {
    var timers = {}
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId"
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId])
        }
        timers[uniqueId] = setTimeout(callback, ms)
    }
})()

$('.menu-toggle').click(function () {
    $('body').toggleClass('min')
})

$("[data-toggle='maximize']").click(function () {
    var parent = $(this).closest('.card')
    $(parent).toggleClass('card-maximized')
})

$("[data-toggle='refresh']").click(function () {
    var parent = $(this).closest('.card')
    var progress = `
    <div class="card-feedback">
        <div class="progress">
            <div class="progress-bar-smooth"></div>
        </div>  
    </div>`

    $(parent).append(progress)

    hideFeedback(parent)
})

$("[data-toggle='close']").click(function () {
    var parent = $(this).closest('.card')
    $(parent).remove()
})

$('.table thead th').click(function () {
    let classname = $(this).attr('class')
    console.log(classname)
    $('.table thead th').attr('class', '')

    if (!classname) $(this).addClass('sort-asc')
    else if (classname === 'sort-asc') $(this).attr('class', 'sort-desc')
    else $(this).attr('class', 'sort-asc')
})

function hideFeedback (card) {
    setTimeout(() => {
        let feedback = $(card).find('.card-feedback')
        $(feedback).remove()

        let isError = Math.random() >= 0.5
        if (isError) $(card).trigger('feedback-error')
    }, 2000)
}

$('.card').on('feedback-error', function () {
    let alert = `
    <div class="card-feedback">
        <div class="alert alert-danger">Something went terribly wrong</div>
    </div>`

    $(this).append(alert)
    hideFeedback(this)
})

$(window).resize(function () {
    waitForFinalEvent(function () {
        let width = $(window).width()
        if (width < 1450) $('body').addClass('min')
        else $('body').removeClass('min')
    }, 500)
})

let modal = $('#modal')

$('form').change(function () {
    let modalSize = $('input[name=size]:checked').val()
    let modalStyle = $('input[name=style]:checked').val()
    let modalPosition = $('input[name=position]:checked').val()

    $(modal).find('.modal-dialog').attr('class', `modal-dialog ${modalSize} ${modalPosition}`)
    $(modal).attr('class', `modal ${modalStyle} fade`)
})