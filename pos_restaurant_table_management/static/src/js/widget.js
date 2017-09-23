function pos_restaurant_table_management_widget(instance, module){
    var QWeb = instance.web.qweb;
    _t = instance.web._t;

     module.PosWidget.include({
            build_widgets: function() {
                
                var self = this;
                this._super();     

                // Floor Selector
                this.floor_popup = new module.FloorPopUp(this,{});
                this.floor_popup.appendTo(this.$el);
                this.floor_popup.hide();
                this.screen_selector.popup_set['floors'] = this.floor_popup;     

                // Table Selector
                this.table_popup = new module.TablePopUp(this,{});
                this.table_popup.appendTo(this.$el);
                this.table_popup.hide();
                this.screen_selector.popup_set['tables'] = this.table_popup;     
            }
    });

     module.ClientListScreenWidget.include({
        show: function(){
            var self = this;        
            this._super();
            this.$('.select-table').click(function(){
                self.pos_widget.screen_selector.show_popup('floors');
                        });
            }
    });

    module.TablePopUp = module.PopUpWidget.extend({
        template: "TablePopupWidget",
        init: function(parent, options){
            var self = this;
            this._super(parent, options);
            this.table_list = options.table_list || [];
        },
        set_table_list: function(table_list){
            this.table_list = table_list;
            this.renderElement();
        },
        renderElement: function() {
            // var self = this;
            // var el_str = openerp.qweb.render(this.template, {widget:this});
            // var el_node = document.createElement("div");
            // el_node.innerHTML = el_str;
            // this.el = el_str;


            var self = this;
            this._super();
            _.each(this.table_list, function(table) {
                var button = new module.TableButtonWidget(self,{
                    pos: self.pos,
                    pos_widget : self.pos_widget,
                    table: table,
                });
                button.appendTo(self.$(".popup"));                
                });
        },            
        events: {
            "click #table-cancel": function(){
                this.pos_widget.screen_selector.show_popup("floors");
            }
        }
    });

    module.TableButtonWidget = module.PosBaseWidget.extend({
        template: 'TableButtonWidget',
        init: function(parent, options){
            this._super(parent, options);
            this.table = options.table;
        },
        renderElement: function(){
            var self = this;
            this._super();
            this.$el.click(function(){
                console.log(self.pos.db.get_table_by_id(1).name);
            });

        }
    });        
    
    module.FloorPopUp = module.PopUpWidget.extend({
            template:'FloorPopupWidget',
            
        renderElement: function() {
            var self = this;
            this._super();
            _.each(this.pos.floors, function(_floor) {
                var button = new module.FloorButtonWidget(self,{
                    pos: self.pos,
                    pos_widget : self.pos_widget,
                    _floor: _floor,
                });
                button.appendTo(self.$(".popup"));                
                });
        },            
            events: {
                'click #floor-cancel': function(){
                            this.pos_widget.screen_selector.set_current_screen('clientlist');
                    }
                }                                            
        });     
        
    module.FloorButtonWidget = module.PosBaseWidget.extend({
        template: 'FloorButtonWidget',
        init: function(parent, options){
            this._super(parent, options);
            this._floor = options._floor;
        },
        renderElement: function(){
            var self = this;
            this._super();
            this.$el.click(function(){
                self.pos_widget.table_popup.set_table_list(self.pos.db.get_table_by_floor(self._floor.id));
                self.pos_widget.screen_selector.show_popup("tables");
            });

        }
    });        
    
    };
