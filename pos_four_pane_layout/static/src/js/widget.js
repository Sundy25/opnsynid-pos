function pos_four_pane_layout_widget(instance, module){
    module = instance.point_of_sale;
    var QWeb = instance.web.qweb;
    _t = instance.web._t;

     module.PosWidget.include({
        set_leftpane_visible: function(visible){
            if(visible !== this.leftpane_visible){
                this.leftpane_visible = visible;
                if(visible){
                    this.$('.pos-leftpane').removeClass('oe_hidden');
                    this.$('.rightpane').css({'left':'780px'});
                }else{
                    this.$('.pos-leftpane').addClass('oe_hidden');
                    this.$('.rightpane').css({'left':'0px'});
                }
            }

        },   
    });
    
    };

