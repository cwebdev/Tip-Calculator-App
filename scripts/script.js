let tipPercentage = 0;
let billAmount = 0;
let totalPersons = 1;
let tipPerPerson = 0;
let totalPerPerson = 0;

function UpdateCalculations()
{
    if($('.billInput').val().length > 0 && $('.peopleInput').val().length > 0 && $('.active-Box').length > 0
    && totalPersons != 0)
    {
        tipPerPerson = (billAmount * tipPercentage / 100) / totalPersons;
        totalPerPerson = (billAmount / totalPersons) + tipPerPerson;
    }

    $('.tipAmountWrapper .amount').html("$" + tipPerPerson.toFixed(2));
    $('.totalWrapper .amount').html("$" + totalPerPerson.toFixed(2));

    $('.resetBtn').attr('disabled',false);
}

function validateFloatNumber(event)
{    
    if(event.charCode == 8 || event.charCode == 0 || event.charCode == 13
        || event.charCode == 101 || event.charCode == 45)
    {
        return false;
    }
    else
    {
        return (event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57));
    } 
}

function validateNumber(event)
{
    return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13)
    ? null : event.charCode >= 48 && event.charCode <= 57;
}

$(function ()
{   
    UpdateCalculations();
    $('.resetBtn').attr('disabled',true);

    $('.TipBox').on('click',function(){
        $('.TipBox').removeClass('active-Box');
        $(this).addClass('active-Box');
        if($(this).hasClass('FixedTipBox'))
        {
            tipPercentage = parseInt($(this).attr('percentage'));
            $('.CustomInputBox').val("");
            $('.CustomInputBox').hide();
            $('.CustomBoxText').show();
        }
        
        UpdateCalculations();
    });

    $('.billInput').on('keypress',validateFloatNumber);
    $('.billInput').on('keyup',function()
    {
        if($(this).val().length > 0)
        {
            billAmount = parseFloat($(this).val());
        }
        UpdateCalculations();
    });

    $('.CustomInputBox').on('keypress',validateFloatNumber);
    $('.CustomBox').on('click', function(){
        $('.CustomBoxText').hide();        
        $('.CustomInputBox').show();
        $('.CustomInputBox').trigger('focus');        
    });

    $('.CustomInputBox').on('keyup', function()
    {
        if($(this).val().length > 0)
        {
            tipPercentage = parseFloat($(this).val());
        }      
        else
        {
            $('.CustomInputBox').val("0");
            tipPercentage = 0;
        }  
        UpdateCalculations();
    });

    $('.CustomInputBox').on('blur', function()
    {
        if($(this).val().length == 0)
        {
            $('.CustomInputBox').val("0");
            tipPercentage = 0;
        }
        UpdateCalculations();
    });

    $('.peopleInput').on('keypress',validateNumber);
    $('.peopleInput').on('keyup',function(event)
    {
        $('.peopleErrorMessage').hide();
        if($(this).val().length > 0)
        {
            totalPersons = parseInt($(this).val());
        }
        UpdateCalculations();  
    });

    $('.peopleInput').on('blur', function()
    {
        if($(this).val().length > 0 && parseInt($(this).val()) == 0)
        {
            $('.peopleErrorMessage').show();
        }
    });


    $('.resetBtn').on('click',function(){
        tipPerPerson = 0;
        totalPerPerson = 0;
        $('.TipBox').removeClass('active-Box');
        $('.billInput').val("");
        $('.peopleInput').val("");
        $('.peopleErrorMessage').hide();
        $('.CustomInputBox').val("");
        $('.CustomInputBox').hide();
        $('.CustomBoxText').show();        
        UpdateCalculations();
        $('.resetBtn').attr('disabled',true);
    });

    
});