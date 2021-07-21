"use strict";

let tipPercentage = 0;
let billAmount = 0;
let totalPersons = 1;
let tipPerPerson = 0;
let totalPerPerson = 0;

$(function() {
    UpdateCalculations();
    $('.js-resetBtn').attr('disabled', true);
    
    $('.js-billInput').on('keypress', validateFloatNumber);
    $('.js-billInput').on('keyup', processBillInputChange);

    $('.js-TipBox').on('click', processTipBoxClick);
    $('.js-CustomInputBox').on('keypress', validateFloatNumber);
    $('.js-CustomBox').on('click', processCustomBoxClick);
    $('.js-CustomInputBox').on('keyup', processCustomInputChange);
    $('.js-CustomInputBox').on('blur', processCustomInputBlur);
    
    $('.js-peopleInput').on('keypress', validateNumber);
    $('.js-peopleInput').on('keyup', processPeopleInputChange);     
    $('.js-peopleInput').on('blur', processPeopleInputBlur);

    $('.js-resetBtn').on('click', processResetBtnClick);
});


function UpdateCalculations() {
    if ($('.js-billInput').val().length > 0 && $('.js-peopleInput').val().length > 0
        && $('.active-Box').length > 0 && totalPersons != 0) {
        tipPerPerson = (billAmount * tipPercentage / 100) / totalPersons;
        totalPerPerson = (billAmount / totalPersons) + tipPerPerson;
    }

    $('.js-tipAmountWrapper .amount').html("$" + tipPerPerson.toFixed(2));
    $('.js-totalWrapper .amount').html("$" + totalPerPerson.toFixed(2));

    $('.js-resetBtn').attr('disabled', false);
}

function validateFloatNumber(event) {
    if (event.charCode == 8 || event.charCode == 0 || event.charCode == 13 ||
        event.charCode == 101 || event.charCode == 45) {
        return false;
    } else {
        return (event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57));
    }
}

function validateNumber(event) {
    return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ?
        null : event.charCode >= 48 && event.charCode <= 57;
}

function processBillInputChange()
{
    if ($(this).val().length > 0) {
        billAmount = parseFloat($(this).val());
    }
    UpdateCalculations();
}

function processTipBoxClick()
{
    $('.js-TipBox').removeClass('active-Box');
    $(this).addClass('active-Box');
    if ($(this).hasClass('FixedTipBox')) {
        tipPercentage = parseInt($(this).attr('percentage'));
        $('.js-CustomInputBox').val("");
        $('.js-CustomInputBox').hide();
        $('.js-CustomBoxText').show();
    }

    UpdateCalculations();
}

function processCustomBoxClick()
{
    $('.js-CustomBoxText').hide();
    $('.js-CustomInputBox').show();
    $('.js-CustomInputBox').trigger('focus');
}

function processCustomInputChange()
{
    if ($(this).val().length > 0) {
        tipPercentage = parseFloat($(this).val());
    } else {
        $('.js-CustomInputBox').val("0");
        tipPercentage = 0;
    }
    UpdateCalculations();
}

function processCustomInputBlur()
{
    if ($(this).val().length == 0) {
        $('.js-CustomInputBox').val("0");
        tipPercentage = 0;
    }
    UpdateCalculations();
}

function processPeopleInputChange()
{
    $('.js-peopleErrorMessage').hide();
    if ($(this).val().length > 0) {
        totalPersons = parseInt($(this).val());
    }
    UpdateCalculations();
}

function processPeopleInputBlur()
{
    if ($(this).val().length > 0 && parseInt($(this).val()) == 0) {
        $('.js-peopleErrorMessage').show();
    }
}

function processResetBtnClick()
{
    tipPerPerson = 0;
    totalPerPerson = 0;
    $('.js-TipBox').removeClass('active-Box');
    $('.js-billInput').val("");
    $('.js-peopleInput').val("");
    $('.js-peopleErrorMessage').hide();
    $('.js-CustomInputBox').val("");
    $('.js-CustomInputBox').hide();
    $('.CustomBoxText').show();
    UpdateCalculations();
    $('.js-resetBtn').attr('disabled', true);
}
