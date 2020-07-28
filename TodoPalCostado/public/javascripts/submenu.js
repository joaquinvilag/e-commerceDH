$(document).ready(main);

var contador = 1;

function main(){
    $('.desplegar').click(function(){
        if(contador == 1){
            $('.sub_menu_ul').animate({
                right: '0%'
            });
            contador = 0;
        } else {
            contador = 1;
            $('.sub_menu_ul').animate({
                right: '-300%'
            });
        }
    });
}