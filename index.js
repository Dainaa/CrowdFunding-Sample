let disabledPledge = document.getElementById("disabled-pledge")
//console.log(disabledPledge);
let bookmarkBtn = document.getElementById("bookmark-btn-id")
let btnsPrimary = document.getElementsByClassName("btn-primary")

//disable all required areas
var $disabledButtons = $("button.disabled")
$disabledButtons.attr("disabled","disabled").text("Out of stock").css('backgroundColor','gray')

var originalAmount= parseInt(89914)
const progress = document.querySelector('.completed-progress')
const backers = document.querySelector('.number-of-backers')
var backersNum = parseInt(5007)
var numBlackStands = parseInt(64)
var numMahoganyStands = parseInt(0)
var numBambooStands = parseInt(101)

//Bookmark button functionality
function bookmark(){
    if (bookmarkBtn.classList.contains('unclicked')){
        bookmarkBtn.classList.add('clicked')
        bookmarkBtn.classList.remove('unclicked')
    }
    else if (bookmarkBtn.classList.contains('clicked')){
        bookmarkBtn.classList.add('unclicked')
        bookmarkBtn.classList.remove('clicked')
    }

}

bookmarkBtn.addEventListener('click', bookmark)


$(".success-modal-continue").click(function(){
    $(".overlay").hide()
    $(".success-modal").hide()
})
//Navigation Modal
$(".nav-hamburger").click(function(){
    $(".overlay").show()
    $(".mobile-nav-modal").show()
    //Prevent body scrolling
    $('body').css('overflow','hidden')
})

//If you click anywhere on the overlay, the modal closes
$(".overlay").click(function(){
    $(this).hide() // hide overlay
    $(".modal").hide() //hide all modals

    //Allow scrolling again
    $('body').css('overflow','auto')
})

//Go to desired section of page
$(".links-mobile>a").click(function(){
    //Enable Overlay Interaction
    $(".overlay").css("pointer-events","auto")
    $(".overlay").click();
})

//Back This Project
var $backProjectButton = $("#back-this-project")
//Show selection modal on click
$backProjectButton.click(function(){
    
    //Disable Body Scrolling
    $(".overlay").show();

    //Show Selection Modal
    $(".selection-modal").show()

    //Disable Overlay Interaction
    $(".overlay").css("pointer-events","none")
})

$(".cta-select").click(function(){
    //Disable Body Scrolling
    $(".overlay").show();

    //Show Selection Modal
    $(".selection-modal").show()

    //Disable Overlay Interaction
    $(".overlay").css("pointer-events","none")
})
//Exiting Selection Modal
$("#exit-selection-modal").click(function(){
    $(".overlay").click()
})

//Selecting a pledge from the selection modal
$(":radio").click(function(){

    var $parent =   $(this).parents("div.modal-pledge")
    var $parentSiblings =  $(this).parents("div.modal-pledge").siblings(".modal-pledge")

    $parent.removeClass("unselected").addClass("selected")
    $parentSiblings.removeClass("selected").addClass("unselected")

    $parent.find(".pledge-selected").show()
    $parentSiblings.find(".pledge-selected").hide()
})

$(".modal-btn-primary").click(function(){
    var amount = parseInt($(this).siblings(".modal-pledge-input").find("input").val())
    console.log(amount)
    
    var $parentID = $(this).parents("div.modal-pledge").find("input").attr('id')
    console.log($parentID)

    if(amount==''){
        alert("Please enter a pledge")
    }else{
        //Check which pledge is being selected and if the minimum pledge requirement is met

        //Check if the minimum requirements are met
        if($parentID == 'no-reward'){
            //Make Updates to Page
            

            //close overlay
        }
        else if ($parentID == 'bamboo-stand'){
            if(amount >= 25){
                //Make updates to page

                //update money raised
                var moneyRaised = originalAmount + amount
                console.log(moneyRaised)
                //reset original amount
                originalAmount = moneyRaised
                $("#amount-raised").text(moneyRaised.toLocaleString())

                //update progress bar
                var newProgress =100*(moneyRaised/100000)
                setProgressBar(newProgress)
                
                //decrement remaining number of products
                numBambooStands-- 
                console.log(numBambooStands)
                console.log( $($parentID).find('.products-remaining').text())
                $($parentID).find('.products-remaining').text(numBambooStands)



                //update number of backers
                //backers is a string, backersNum is an int
                backersNum++
                $(backers).text(backersNum.toLocaleString())


                //close overlay
                closeOverlayAfterPledge() 
                
                //Show thank you modal
                $(".overlay").show()
                $(".success-modal").show()
                
            }
            else if (amount < 25){
                alert("This pledge requires a minimum donation of $25.")
            }
        }
        else if ($parentID == 'black-stand'){
            if(amount >= '75'){
                closeOverlayAfterPledge()
            }
            else{
                alert("This pledge requires a minimum donation of $75.")
            }
        }
        else if ($parentID == 'mahogany-stand'){
            if(amount >= '200'){
                closeOverlayAfterPledge()
            }
            else{
                alert("This pledge requires a minimum donation of $200.")
            }
        }
        

        
    }
})

function closeOverlayAfterPledge(){
    $(".overlay").click();
    //Reset the Modal
    $(this).siblings(".modal-pledge-input").find("input").val("")
    $(this).parents("div.modal-pledge").removeClass("selected").addClass("unselected")
    $(this).parents("div.modal-pledge").find(":radio").prop('checked',false)
    $(this).parents("div.modal-pledge").find('.pledge-selected').hide(0)
}


//set initial progress bar
progress.style.width = $(progress).attr('data-progress')+'%'


function setProgressBar(newProgress){
    console.log(newProgress)
    $(progress).attr('data-progress', newProgress)
    progress.style.width = $(progress).attr('data-progress')+'%'
}

