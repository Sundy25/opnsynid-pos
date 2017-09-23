function pos_restaurant_table_management_models(instance, module){
    var QWeb = instance.web.qweb;
    _t = instance.web._t;


    module.PosModel.prototype.floors = [];
    module.PosModel.prototype.tables = [];

    module.PosModel.prototype.models.push({
        model: "pos.floor",
        fields: ["name"],
        domain: function(self){ return [["id", "in", self.config.floor_ids]]},
        loaded: function(self, floors){
            self.floors = floors;
        },
    },
    {
        model: "pos.table",
        fields: ["name", "capacity", "state", "floor_id"],
        domain: function(self){ return [["floor_id", "in", self.config.floor_ids]]},
        loaded: function(self, tables){
            self.tables = tables;
            self.db.add_tables(tables);
        },
    }
    );

    // var OrderParent = module.Order;
    // module.Order = module.Order.extend({
    //     initialize: function(attributes){
    //         var self = this;
    //         this._super(attributes);
    //         this.set({
    //             "table": null,
    //         });
    //     },
    // });
};

