const knex = require('knex')(require('../knexfile'))
const express = require('express')
const multer = require('multer');
var moment   = require('moment');
var date   = new Date();
var myDate   = moment(date).format('llll');
var fs = require('fs');

module.exports.addvessel = (req,res,next) =>{
	//var files = req.files;
	var data =req.body;	
	// if(files.company_background_sheet){
	// 	var sheet_background = 'company_background_sheet' + myDate + files.company_background_sheet[0].originalname;   
	// }
	// if(files.vessal_history_sheet){
	// 	var sheet_vessel_history = 'vessal_history_sheet' +myDate + files.vessal_history_sheet[0].originalname;
	// }	
	// if(files.operating_record_sheet){
	// 	var sheet_record ='operating_record_sheet'+ myDate + files.operating_record_sheet[0].originalname;
	// }

	  //console.log("bk sheet="+ sheet_background + "=vhsheet=  "+ sheet_vessel_history+"  =rsheet="+sheet_record );

	  knex('vessel_management').where({ imo : data.imo}).then((resdata) => {

	  	if(resdata.length>0){
	  		const responseData = {
	  			'success':false,
	  			'message':"imo number is already exist"
	  		}
	  		res.send(responseData)
	  	}else{
	  		if(data.bulbows_bow == 'true'){
                 var bulbows_bow = 'Y'
	  		}else{
                     var bulbows_bow = 'N'
	  		}
	  		if(data.dbl_bottom == 'true'){
	  			var dbl_bottom = 'Y'
	  		}else{
	  			var dbl_bottom = 'N'

	  		}
	  		if(data.bollard_pull == 'true'){
	  			var bollard_pull = 'Y'
	  		}else{
	  			var bollard_pull = 'N'

	  		}
	  		if(data.dbl_deck == 'true'){
	  			var dbl_deck = 'Y'
	  		}else{
	  			var dbl_deck = 'N'

	  		}
	  		if(data.dbl_side_skins == 'true'){
	  			var dbl_side_skins = 'Y'
	  		}else{
	  			var dbl_side_skins = 'N'

	  		}
	  		if(data.grabs == 'yes'){
	  			var grabs = 'Y'
	  		}else{
	  			var grabs = 'N'

	  		}
	  		var insertdata = {
	  			imo                              :  data.imo,
	  			vessel_name                      :  data.vessel_name,
	  			id_operator                      :  data.id_operator,
	  			id_builder                       :  data.id_builder,
	  			id_comment                       :  data.id_comment,
	  			yard                             :  data.yard_number,
	  			hull_number                      :  data.hull,
	  			built_month                      :  data.built_month,
	  			built_year                       :  data.built_year,
	  			grt                              :  data.grt,
	  			nrt                              :  data.nrt,
	  			id_ship_type                     :  data.vessel_type,
	  			bale_meter                       :  data.bale_meter_capacity,
	  			grain_meter                      :  data.grain_meter_capacity,
	  			bale_feet                        :  data.bale_feet_capacity,
	  			grain_feet                       :  data.grain_feet_capacity,
	  			hatches                          :  data.number_of_hatches,
	  			length_hold                      :  data.length_hold,
	  			height_hold                      :  data.height_hold,
	  			length_hatch                     :  data.length_hatch,
	  			height_hatch                     :  data.height_hatch,
	  			width_hold_before                :  data.width_hold_before,
	  			width_hold_after                 :  data.width_hold_after,
	  			width_hatch_before               :  data.width_hatch_before,
	  			width_hatch_after                :  data.width_hatch_after,
	  			gear                             :  data.gear,
	  			swl                              :  data.swl,
	  			loa                              :  data.loa,
	  			lbp                              :  data.lbp,
	  			beam                             :  data.beam,
	  			depth                            :  data.depth,
	  			breath_moulded                   :  data.breadth_moulded,
	  			tpc                              :  data.tpc,
	  			disp                             :  data.displacement,
	  			survey_month                     :  data.survey_month,
	  			survey_year                      :  data.survey_year,
	  			id_main_engine_design            :  data.main_engine_design,
	  			id_main_engine_type              :  data.main_engine_type,
	  			id_aux_engine_design             :  data.aux_engine_design,
	  			id_aux_engine_type               :  data.aux_engine_type,
	  			ship_power                       :  data.power,
	  			speed_laden_1                    :  data.speed_laden_1,
	  			speed_ballast_1                  :  data.speed_ballast_1,
	  			laden_fuel_1                     :  data.laden_fuel_1,
	  			ballast_fuel_1                   :  data.ballast_fuel_1,
	  			id_fuel_type_laden_1             :  data.id_fuel_type_laden_1,
	  			id_fuel_type_ballast_1           :  data.id_fuel_type_ballast_1,
	  			cb                               :  data.country_of_build,
	  			speed_laden_2                    :  data.speed_laden_2,
	  			speed_ballast_2                  :  data.speed_ballast_2,
	  			laden_fuel_2                     :  data.laden_fuel_2,
	  			ballast_fuel_2                   :  data.ballast_fuel_2,
	  			id_fuel_type_laden_2             :  data.id_fuel_type_laden_2,
	  			id_fuel_type_ballast_2           :  data.id_fuel_type_ballast_2,
	  			speed_laden_3                    :  data.speed_laden_3,
	  			speed_ballast_3                  :  data.speed_ballast_3,
	  			laden_fuel_3                     :  data.laden_fuel_3,
	  			ballast_fuel_3                   :  data.ballast_fuel_3,
	  			id_fuel_type_laden_3             :  data.id_fuel_type_laden_3,
	  			id_fuel_type_ballast_3           :  data.id_fuel_type_ballast_3,
	  			aux_hours                        :  data.engine_hours,
	  			fuel_aux_1                       :  data.fuel_aux_1,
	  			id_fuel_type_aux_1               :  data.id_fuel_type_aux_1,
	  			fuel_aux_2                       :  data.fuel_aux_2,
	  			id_fuel_type_aux_2               :  data.id_fuel_type_aux_2,
	  			fuel_aux_3                       :  data.fuel_aux_3,
	  			id_fuel_type_aux_3               :  data.id_fuel_type_aux_3,
	  			id_ship_flag                     :  data.flag,
	  			id_ship_base                     :  data.base,
	  			id_ship_status                   :  data.status,
	  			cost                             :  data.cost,
	  			scrap_value                      :  data.scrap_value,
	  			amo_period                       :  data.amorization_period,
	  			cost_capital                     :  data.cost_of_capital,
	  			annual_cost                      :  data.annual_operating_cost,
	  			be_cost                          :  data.breakeven_daily_cost,
	  			daily_cost                       :  data.daily_operating_cost,
	  			id_port_reg                      :  data.port_of_registry,
	  			id_ship_manager                  :  data.ship_manager,
	  			id_owner                         :  data.owner,
	  			call_sign                        :  data.call_sign,
	  			ship_age                         :  data.age_of_ship,
	  			ice_class                        :  data.ice_class,
	  			in_fax                           :  data.inmarsat_fax,
	  			in_telex                         :  data.inmarsat_telex,
	  			smc_company                      :  data.smc_company,
	  			smc_issued                       :  data.smc_issued,
	  			smc_issued_date                  :  data.smc_issued_date,
	  			smc_expiry_date                  :  data.smc_expiry_date,
	  			crew                             :  data.crew,
	  			id_officer_nationality           :  data.officiers_nationality,
	  			id_crew_nationality              :  data.crew_nationality,
	  			hull_material                    :  data.hull_material,
	  			decks                            :  data.decks_number,
	  			bulbows_bow                      :  bulbows_bow,
	  			dbl_bottom                       :   dbl_bottom,
	  			bollard_pull                     :  bollard_pull,
	  			dbl_deck                         :  dbl_deck,
	  			dbl_side_skins                   :  dbl_side_skins,
	  			winches                          :  data.winches,
	  			id_activity                      :  data.activity,
	            sheet_background                 :  data.company_background_sheet,
	  			sheet_vessel_history             :  data.vessal_history_sheet,
	  			sheet_record                     :  data.operating_record_sheet,
	  			dwt_trop                         :  data.dwt_tropical,
	  			dwt_trop_fresh                   :  data.dwt_tropical_freshwater,
	  			dwt_fresh                        :  data.dwt_freshwater,
	  			dwt_summer                       :  data.dwt_summer,
	  			draft_trop                       :  data.draft_tropical,
	  			draft_trop_fresh                 :  data.draft_tropical_freshwater,
	  			draft_fresh                      :  data.draft_freshwater,
	  			draft_summer                     :  data.draft_summer,
	  			ship_const                       :  data.constants,
	  			created_by                       :  data.created_by,
	  			updated_by                       :  data.updated_by,
	  			consumption_speed                :  data.consumption_speed,
	  			cylinder_stroke                  :  data.main_engine_stroke_type,
	  			engine_rpm                       :  data.main_engine_rpm,
	  			grabs                            :  grabs,
	  			grabs_number                     :  data.grabs_number,
	  			grabs_capacity                   :  data.grabs_capacity,
	  			contract_date                    :  data.contract_date,
	  			cancel_date                      :  data.cancel_date,
	  			construction_entry               :  data.new_construction_entry_date,
	  			pandl_club                       :  data.pandl_club,
	  			cargo_capacities_narrative       :  data.cargo_capacities_narrative,
	  			fuel_type_1                      :  data.fuel_type_1,
	  			fuel_type_2                      :  data.fuel_type_2,
	  			hull_type                        :  data.hull_type,
	  			fuel_consumption_main_engine_only:  data.fuel_consumption_main_engine_only,
	  			group_beneficial_owner           :  data.group_beneficial_owner,
	  			main_engine_builder              :  data.main_engine_builder,
	  			main_engine_model                :  data.main_engine_model,
	  			number_holds                     :  data.number_of_holds,
	  			class_narrative                  :  data.class_narrative,
	  			light_weight_tons                :  data.light_weight_tons,
	  			delivery_month                   :  data.delivery_month,
	  			delivery_year                    :  data.delivery_year,
	  			block_coeficient                 : data.block_coeficient,
	  			delete_month                     :  "02",
	  			delete_year                      :  "2019",
	  			is_delete                        :  "N",
	  			is_active                        :  "Y",
	  			holds                            :  "holds",
	  			vessel_info                      :  "vessel_info",
	  			former_names                     :  "former_names",
	  			design                           :  "design",
	  			fdwt                             :  "fdwt",
	  			scnt                             :  "scnt",
	  			pcnt                             :  "pcnt",
	  			shipyard_country                 :  "shipyard_country",
	  			engine_details                   :  "engine_details",
	  			sub_status                       :  "sub_status",
	  			sub_type                         :  "sub_type",
	  			sub_type1                        :  "sub_type1",
	  			operator_cod                     :  "operator_cod",
	  			shipyard                         :  "shipyard",
	  			engine_layout                    :  "engine_layout",
	  			engine_stroke                    :  "engine_stroke",
	  			engine_type                      :  "engine_type",
	  			type_propulsion                  :  "type_propulsion",
	  			ldt                              :  "ldt",
	  			gear_type_largest                :  "gear_type_largest",
	  			dwt                              :  "1",
	  			active_month                     :  "12",
	  			active_year                      :  "2019",
	  			draft                            :  "1",
	  			id_class                         :  "1",
	  			id_port                          :  "1",
	  			ideas                            :  "1",
	  			id_position                      :  "1",
	  			id_tracking                      :  "1",
	  			fresh_pos_date                   :  "2019-09-18",
	  			keel_laid                        :  "2019-09-18",
	  			launched                         :  "2019-09-18",
	  			scrap                            :  "2019-09-18",
	  			acquired                         :  "2019-09-18",
	  			tpi                              :  "1",
	  			deth                             :  "1",
	  			last_update                      :  "2019-09-18",
	  			nb_price                         :  "1",
	  			engine_number_of                 :  "1",
	  			engine_hp_total                  :  "1",
	  			engine_kw_total                  :  "1",
	  			propulsion_units                 :  "1",
	  			ore                              :  "1",
	  			id_registered_owner              :  "1",
	  			id_cod_registered_owner          :  "1",
	  			id_main_hull_contractor          :  "1",
	  			id_main_newbuild_contractor      :  "1",
	  			id_statcode                      :  "1",
	  			id_main_engine_builder           :  "1",
	  			fuel_consumption                 :  "1",
	  			gear_no_largest                  :  "1",
	  			gearless                         :  "N",
	  			consumption_speed2               :  "1",
	  			consumption_value_1              :  "1",
	  			Total_PowerOf_AllEngines         :  "1",
	  			Total_Kilo_wattsof_MainEngines   :  "1",
	  			Total_PowerOf_Auxiliary_Engines  :  "1",
	  			fuel_type_1_first                :  "1",
	  			fuel_type_1_second               :  "1",
	  			fuel_type_first_capacity         :  "1",
	  			fuel_type_second_capacity        :  "1",
	  			consumption_value_2              :  "1"
  //       imo                              :  data.imo,
		// vessel_name                      :  data.vessel_name,
		// id_operator                      :  data.id_operator,
		// id_builder                       :  data.id_builder,
		// id_comment                       :  data.id_comment,
		// yard                             :  data.yard_number,
		// hull_number                      :  data.hull,
		// built_month                      :  data.built_month,
		// built_year                       :  data.built_year,
		// active_month                     :  data.active_month,
		// active_year                      :  data.active_year,
		// delete_month                     :  data.delete_month,
		// delete_year                      :  data.delete_year,
		// dwt                              :  data.dwt,
		// grt                              :  data.grt,
		// nrt                              :  data.nrt,
		// id_ship_type                     :  data.vessel_type,
		// bale_meter                       :  data.bale_meter_capacity,
		// grain_meter                      :  data.grain_meter_capacity,
		// bale_feet                        :  data.bale_feet_capacity,
		// grain_feet                       :  data.grain_feet_capacity,
		// holds                            :  data.holds,
		// hatches                          :  data.number_of_hatches,
		// length_hold                      :  data.length_hold,
		// height_hold                      :  data.height_hold,
		// length_hatch                     :  data.length_hatch,
		// height_hatch                     :  data.height_hatch,
		// width_hold_before                :  data.width_hold_before,
		// width_hold_after                 :  data.width_hold_after,
		// width_hatch_before               :  data.width_hatch_before,
		// width_hatch_after                :  data.width_hatch_after,
		// gear                             :  data.gear,
		// swl                              :  data.swl,
		// loa                              :  data.loa,
		// lbp                              :  data.lbp,
		// //beam                             :  "1.5",
	 //    beam                             :  data.beam,
		// depth                            :  data.depth,
		// draft                            :  data.draft,
		// //breath_moulded                   :  "1.5",
		// breath_moulded                   :  data.breadth_moulded,
		// tpc                              :  data.tpc,
		// disp                             :  data.displacement,
		// ldt                              :  data.ldt,
		// cb                               :  data.country_of_build,
		// id_class                         :  data.id_class,
		// survey_month                     :  data.survey_month,
		// survey_year                      :  data.survey_year,
		// id_main_engine_design            :  data.main_engine_design,
		// id_main_engine_type              :  data.main_engine_type,
		// id_aux_engine_design             :  data.aux_engine_design,
		// id_aux_engine_type               :  data.aux_engine_type,
		// ship_power                       :  data.power,
		// speed_laden_1                    :  data.speed_laden_1,
		// speed_ballast_1                  :  data.speed_ballast_1,
		// laden_fuel_1                     :  data.laden_fuel_1,
		// ballast_fuel_1                   :  data.ballast_fuel_1,
		// id_fuel_type_laden_1             :  data.id_fuel_type_laden_1,
		// id_fuel_type_ballast_1           :  data.id_fuel_type_ballast_1,
		// speed_laden_2                    :  data.speed_laden_2,
		// speed_ballast_2                  :  data.speed_ballast_2,
		// laden_fuel_2                     :  data.laden_fuel_2,
		// ballast_fuel_2                   :  data.ballast_fuel_2,
		// id_fuel_type_laden_2             :  data.id_fuel_type_laden_2,
		// id_fuel_type_ballast_2           :  data.id_fuel_type_ballast_2,
		// speed_laden_3                    :  data.speed_laden_3,
		// speed_ballast_3                  :  data.speed_ballast_3,
		// laden_fuel_3                     :  data.laden_fuel_3,
		// ballast_fuel_3                   :  data.ballast_fuel_3,
		// id_fuel_type_laden_3             :  data.id_fuel_type_laden_3,
		// id_fuel_type_ballast_3           :  data.id_fuel_type_ballast_3,
		// aux_hours                        :  data.engine_hours,
		// fuel_aux_1                       :  data.fuel_aux_1,
		// id_fuel_type_aux_1               :  data.id_fuel_type_aux_1,
		// fuel_aux_2                       :  data.fuel_aux_2,
		// id_fuel_type_aux_2               :  data.id_fuel_type_aux_2,
		// fuel_aux_3                       :  data.fuel_aux_3,
		// id_fuel_type_aux_3               :  data.id_fuel_type_aux_3,
		// id_ship_flag                     :  data.flag,
		// id_ship_base                     :  data.base,
		// id_ship_status                   :  data.status,
		// cost                             :  data.cost,
		// scrap_value                      :  data.scrap_value,
		// amo_period                       :  data.amorization_period,
		// cost_capital                     :  data.cost_of_capital,
		// annual_cost                      :  data.annual_operating_cost,
		// be_cost                          :  data.breakeven_daily_cost,
		// daily_cost                       :  data.daily_operating_cost,
		// id_port_reg                      :  data.port_of_registry,
		// id_ship_manager                  :  data.ship_manager,
		// id_owner                         :  data.owner,
		// call_sign                        :  data.call_sign,
		// ship_age                         :  data.age_of_ship,
		// ice_class                        :  data.ice_class,
		// in_phone                         :  data.inmarsat_phone,
		// in_fax                           :  data.inmarsat_fax,
		// in_telex                         :  data.inmarsat_telex,
		// mobile                           :  data.mobile,
		// email                            :  data.email,
		// smc_company                      :  data.smc_company,
		// smc_issued                       :  data.smc_issued,
		// smc_issued_date                  :  data.smc_issued_date,
		// smc_expiry_date                  :  data.smc_expiry_date,
		// crew                             :  data.crew,
		// id_officer_nationality           :  data.officiers_nationality,
		// id_crew_nationality              :  data.crew_nationality,
		// hull_material                    :  data.hull_material,
		// decks                            :  data.decks_number,
		// bulbows_bow                      :  data.bulbows_bow,
		// dbl_bottom                       :  data.dbl_bottom,
		// bollard_pull                     :  data.bollard_pull,
		// dbl_deck                         :  data.dbl_deck,
		// dbl_side_skins                   :  data.dbl_side_skins,
		// winches                          :  data.winches,
		// id_activity                      :  data.activity,
		// id_port                          :  data.id_port,
		// ideas                            :  data.ideas,
		// id_position                      :  data.id_position,
		// id_tracking                      :  data.id_tracking,
		// fresh_pos_date                   :  data.fresh_pos_date,
		// sheet_background                 :  sheet_background,
		// sheet_vessel_history             :  sheet_vessel_history,
		// sheet_record                     :  sheet_record,
		// dwt_trop                         :  data.dwt_tropical,
		// dwt_trop_fresh                   :  data.dwt_tropical_freshwater,
		// dwt_fresh                        :  data.dwt_freshwater,
		// dwt_summer                       :  data.dwt_summer,
		// draft_trop                       :  data.draft_tropical,
		// draft_trop_fresh                 :  data.draft_tropical_freshwater,
		// draft_fresh                      :  data.draft_freshwater,
		// draft_summer                     :  data.draft_summer,
		// vessel_info                      :  data.vessel_info,
		// former_names                     :  data.former_names,
		// ship_const                       :  data.constants,
		// created_by                       :  data.created_by,
		// updated_by                       :  data.updated_by,
		// is_delete                        :  "N",
		// is_active                        :  "Y",
		// date_created                     :  data.date_created,
		// date_updated                     :  data.date_updated,
		// keel_laid                        :  data.keel_laid,
		// launched                         :  data.launched,
		// scrap                            :  data.scrap,
		// acquired                         :  data.acquired,
		// design                           :  data.design,
		// fdwt                             :  data.fdwt,
		// scnt                             :  data.scnt,
		// pcnt                             :  data.pcnt,
		// tpi                              :  data.tpi,
		// shipyard_country                 :  data.shipyard_country,
		// deth                             :  data.death,
		// last_update                      :  data.last_update,
		// nb_price                         :  data.nb_price,
		// consumption_speed                :  data.consumption_speed,
		// cylinder_stroke                  :  data.main_engine_stroke_type,
		// engine_details                   :  data.engine_details,
		// engine_number_of                 :  data.engine_number_of,
		// engine_rpm                       :  data.main_engine_rpm,
		// engine_hp_total                  :  data.engine_hp_total,
		// engine_kw_total                  :  data.engine_kw_total,
		// propulsion_units                 :  data.propulsion_units,
		// ore                              :  data.ore,
		// id_registered_owner              :  data.id_registered_owner,
		// id_cod_registered_owner          :  data.id_cod_registered_owner,
		// id_main_hull_contractor          :  data.id_main_hull_contractor,
		// id_main_newbuild_contractor      :  data.id_main_newbuild_contractor,
		// id_statcode                      :  data.id_statcode,
		// sub_status                       :  data.sub_status,
		// sub_type                         :  data.sub_type,
		// sub_type1                        :  data.sub_type1,
		// operator_cod                     :  data.operator_cod,
		// shipyard                         :  data.shipyard,
		// engine_layout                    :  data.engine_layout,
		// engine_stroke                    :  data.engine_stroke,
		// engine_type                      :  data.engine_type,
		// type_propulsion                  :  data.type_propulsion,
		// grabs                            :  data.grabs,
		// grabs_number                     :  data.grabs_number,
		// grabs_capacity                   :  data.grabs_capacity,
		// contract_date                    :  data.contract_date,
		// cancel_date                      :  data.cancel_date,
		// construction_entry               :  data.new_construction_entry_date,
		// id_main_engine_builder           :  "1",
		// pandl_club                       :  data.pandl_club,
		// fuel_consumption                 :  data.fuel_consumption_total,
		// cargo_capacities_narrative       :  data.cargo_capacities_narrative,
		// fuel_type_1                      :  data.fuel_type_1,
		// fuel_type_2                      :  data.fuel_type_2,
		// class_narrative                  :  data.class_narrative,
		// hull_type                        :  data.hull_type,
		// fuel_consumption_main_engine_only:  data.fuel_consumption_main_engine_only,
		// group_beneficial_owner           :  data.group_beneficial_owner,
		// gear_type_largest                :  data.gear_type_largest,
		// gear_no_largest                  :  data.gear_no_largest,
		// gearless                         :  data.gearless,
		// main_engine_builder              :  data.main_engine_builder,
		// main_engine_model                :  data.main_engine_model,
		// consumption_speed2               :  data.consumption_speed,
		// consumption_value_1              :  data.consumption_value_1,
		// number_holds                     :  data.number_of_holds,
		// Total_PowerOf_AllEngines         :  data.Total_PowerOf_AllEngines,
		// Total_Kilo_wattsof_MainEngines   :  data.Total_Kilo_wattsof_MainEngines,
		// Total_PowerOf_Auxiliary_Engines  :  data.Total_PowerOf_Auxiliary_Engines,
		// fuel_type_1_first                :  data.fuel_type_1_first,
		// fuel_type_1_second               :  data.fuel_type_1_second,
		// fuel_type_first_capacity         :  data.fuel_type_first_capacity,
		// fuel_type_second_capacity        :  data.fuel_type_second_capacity,
		// consumption_value_2              :  data.consumption_value_2	  	
	} 

	console.log(insertdata);
	
	knex('vessel_management').insert(insertdata).then((result) => {
		if(result){
			const responseData = {
				'success':true,
				'message':"Your vessel added successfully"
			}
			res.send(responseData);
		}else{
			const responseData = {
				'success':false,
				'message':"Your vessel not added"
			}
			res.send(responseData);
		}
	})
}
})

}

module.exports.vesselList = (req,res) => {
	knex.select('vessel_management.*').from('vessel_management').where({is_delete:'N'}).orderBy('id', 'desc').then(async(data) =>{
		if(data.length>0){
			const arr =[];
			for(dat of data){
				var fresh_pos_date1 = await dat.fresh_pos_date;
				var fresh_pos_date = await moment(fresh_pos_date1).format('lll');
				var date_created1 = await dat.date_created;
				var date_created = await moment(date_created1).format('lll');
				var date_updated1 = await dat.date_updated;
				var date_updated = await moment(date_updated1).format('lll');
				var keel_laid1 = await dat.keel_laid;
				var keel_laid = await moment(keel_laid1).format('lll');
				var launched1 = await dat.launched;
				var launched = await moment(launched1).format('lll');
				var scrap1 = await dat.scrap;
				var scrap = await moment(scrap1).format('lll');
				var acquired1 = await dat.acquired;
				var acquired = await moment(acquired1).format('lll');
				var last_update1 = await dat.last_update;
				var last_update = await moment(last_update1).format('lll');
				var vessellist = {
					"id": dat.id,
					"imo": dat.imo,
					"vessel_name": dat.vessel_name,
					"id_operator": dat.id_operator,
					"id_builder": dat.id_builder,
					"id_comment": dat.id_comment,
					"yard": dat.yard,
					"hull_number": dat.hull_number,
					"built_month": dat.built_month,
					"built_year": dat.built_year,
					"active_month": dat.active_month,
					"active_year": dat.active_year,
					"delete_month": dat.delete_month,
					"delete_year": dat.delete_year,
					"dwt": dat.dwt,
					"grt": dat.grt,
					"nrt": dat.nrt,
					"id_ship_type": dat.id_ship_type,
					"bale_meter": dat.bale_meter,
					"grain_meter": dat.grain_meter,
					"bale_feet": dat.bale_feet,
					"grain_feet": dat.grain_feet,
					"holds": dat.holds,
					"hatches": dat.hatches,
					"length_hold": dat.length_hold,
					"height_hold": dat.height_hold,
					"length_hatch": dat.length_hatch,
					"height_hatch": dat.height_hatch,
					"width_hold_before": dat.width_hold_before,
					"width_hold_after": dat.width_hold_after,
					"width_hatch_before": dat.width_hatch_before,
					"width_hatch_after": dat.width_hatch_after,
					"gear": dat.gear,
					"swl": dat.swl,
					"loa": dat.loa,
					"lbp": dat.lbp,
					"beam": dat.beam,
					"depth": dat.depth,
					"draft": dat.draft,
					"breath_moulded": dat.breath_moulded,
					"tpc": dat.tpc,
					"disp": dat.disp,
					"ldt": dat.ldt,
					"cb": dat.cb,
					"id_class": dat.id_class,
					"survey_month": dat.survey_month,
					"survey_year": dat.survey_year,
					"id_main_engine_design": dat.id_main_engine_design,
					"id_main_engine_type": dat.id_main_engine_type,
					"id_aux_engine_design": dat.id_aux_engine_design,
					"id_aux_engine_type": dat.id_aux_engine_type,
					"ship_power": dat.ship_power,
					"speed_laden_1": dat.speed_laden_1,
					"speed_ballast_1": dat.speed_ballast_1,
					"laden_fuel_1": dat.laden_fuel_1,
					"ballast_fuel_1": dat.ballast_fuel_1,
					"id_fuel_type_laden_1": dat.id_fuel_type_laden_1,
					"id_fuel_type_ballast_1": dat.id_fuel_type_ballast_1,
					"speed_laden_2": dat.speed_laden_2,
					"speed_ballast_2": dat.speed_ballast_2,
					"laden_fuel_2": dat.laden_fuel_2,
					"ballast_fuel_2": dat.ballast_fuel_2,
					"id_fuel_type_laden_2":dat.id_fuel_type_laden_2,
					"id_fuel_type_ballast_2": dat.id_fuel_type_ballast_2,
					"speed_laden_3": dat.speed_laden_3,
					"speed_ballast_3": dat.speed_ballast_3,
					"laden_fuel_3": dat.laden_fuel_3,
					"ballast_fuel_3": dat.ballast_fuel_3,
					"id_fuel_type_laden_3": dat.id_fuel_type_laden_3,
					"id_fuel_type_ballast_3": dat.id_fuel_type_ballast_3,
					"aux_hours": dat.aux_hours,
					"fuel_aux_1": dat.fuel_aux_1,
					"id_fuel_type_aux_1": dat.id_fuel_type_aux_1,
					"fuel_aux_2": dat.fuel_aux_2,
					"id_fuel_type_aux_2": dat.id_fuel_type_aux_2,
					"fuel_aux_3": dat.fuel_aux_3,
					"id_fuel_type_aux_3": dat.id_fuel_type_aux_3,
					"id_ship_flag": dat.id_ship_flag,
					"id_ship_base": dat.id_ship_base,
					"id_ship_status": dat.id_ship_status,
					"cost": dat.cost,
					"scrap_value": dat.scrap_value,
					"amo_period": dat.amo_period,
					"cost_capital": dat.cost_capital,
					"annual_cost": dat.annual_cost,
					"be_cost": dat.be_cost,
					"daily_cost": dat.daily_cost,
					"id_port_reg": dat.id_port_reg,
					"id_ship_manager": dat.id_ship_manager,
					"id_owner": dat.id_owner,
					"call_sign": dat.call_sign,
					"ship_age": dat.ship_age,
					"ice_class": dat.ice_class,
					"in_phone": dat.in_phone,
					"in_fax": dat.in_fax,
					"in_telex": dat.in_telex,
					"mobile": dat.mobile,
					"email": dat.email,
					"smc_company": dat.smc_company,
					"smc_issued": dat.smc_issued,
					"smc_issued_date": dat.smc_issued_date,
					"smc_expiry_date": dat.smc_expiry_date,
					"crew": dat.crew,
					"id_officer_nationality": dat.id_officer_nationality,
					"id_crew_nationality": dat.id_crew_nationality,
					"hull_material": dat.hull_material,
					"decks": dat.decks,
					"bulbows_bow": dat.bulbows_bow,
					"dbl_bottom": dat.dbl_bottom,
					"bollard_pull": dat.bollard_pull,
					"dbl_deck": dat.dbl_deck,
					"dbl_side_skins": dat.dbl_side_skins,
					"winches": dat.winches,
					"id_activity": dat.id_activity,
					"id_port": dat.id_port,
					"ideas": dat.ideas,
					"id_position": dat.id_position,
					"id_tracking": dat.id_tracking,
					"fresh_pos_date": fresh_pos_date,
					"sheet_background": dat.sheet_background,
					"sheet_vessel_history": dat.sheet_vessel_history,
					"sheet_record": dat.sheet_record,
					"dwt_trop": dat.dwt_trop,
					"dwt_trop_fresh":dat.dwt_trop_fresh,
					"dwt_fresh": dat.dwt_fresh,
					"dwt_summer": dat.dwt_summer,
					"draft_trop": dat.draft_trop,
					"draft_trop_fresh": dat.draft_trop_fresh,
					"draft_fresh": dat.draft_fresh,
					"draft_summer": dat.draft_summer,
					"vessel_info": dat.vessel_info,
					"former_names": dat.former_names,
					"ship_const": dat.ship_const,
					"created_by": dat.created_by,
					"updated_by": dat.updated_by,
					"is_delete": dat.is_delete,
					"is_active": dat.is_active,
					"date_created": date_created,
					"date_updated": date_updated,
					"keel_laid": keel_laid,
					"launched": launched,
					"scrap": scrap,
					"acquired": acquired,
					"design": dat.design,
					"fdwt": dat.fdwt,
					"scnt": dat.scnt,
					"pcnt": dat.pcnt,
					"tpi": dat.tpi,
					"shipyard_country": dat.shipyard_country,
					"deth": dat.deth,
					"last_update": last_update,
					"nb_price": dat.nb_price,
					"consumption_speed": dat.consumption_speed,
					"cylinder_stroke": dat.cylinder_stroke,
					"engine_details": dat.engine_details,
					"engine_number_of": dat.engine_number_of,
					"engine_rpm": dat.engine_rpm,
					"engine_hp_total": dat.engine_hp_total,
					"engine_kw_total": dat.engine_kw_total,
					"propulsion_units": dat.propulsion_units,
					"ore": dat.ore,
					"id_registered_owner": dat.id_registered_owner,
					"id_cod_registered_owner": dat.id_cod_registered_owner,
					"id_main_hull_contractor": dat.id_main_hull_contractor,
					"id_main_newbuild_contractor": dat.id_main_newbuild_contractor,
					"id_statcode": dat.id_statcode,
					"sub_status": dat.sub_status,
					"sub_type": dat.sub_type,
					"sub_type1": dat.sub_type1,
					"operator_cod": dat.operator_cod,
					"shipyard": dat.shipyard,
					"engine_layout": dat.engine_layout,
					"engine_stroke": dat.engine_stroke,
					"engine_type": dat.engine_type,
					"type_propulsion": dat.type_propulsion,
					"grabs":dat.grabs,
					"grabs_number": dat.grabs_number,
					"grabs_capacity": dat.grabs_capacity,
					"contract_date": dat.contract_date,
					"cancel_date": dat.cancel_date,
					"construction_entry": dat.construction_entry,
					"id_main_engine_builder": dat.id_main_engine_builder,
					"pandl_club": dat.pandl_club,
					"fuel_consumption": dat.fuel_consumption,
					"cargo_capacities_narrative": dat.cargo_capacities_narrative,
					"fuel_type_1": dat.fuel_type_1,
					"fuel_type_2": dat.fuel_type_2,
					"class_narrative": dat.class_narrative,
					"hull_type": dat.hull_type,
					"fuel_consumption_main_engine_only": dat.fuel_consumption_main_engine_only,
					"group_beneficial_owner": dat.group_beneficial_owner,
					"gear_type_largest": dat.gear_type_largest,
					"gear_no_largest": dat.gear_no_largest,
					"gearless": dat.gearless,
					"main_engine_builder": dat.main_engine_builder,
					"main_engine_model": dat.main_engine_model,
					"consumption_speed2": dat.consumption_speed2,
					"consumption_value_1": dat.consumption_value_1,
					"number_holds": dat.number_holds,
					"Total_PowerOf_AllEngines": dat.Total_PowerOf_AllEngines,
					"Total_Kilo_wattsof_MainEngines": dat.Total_Kilo_wattsof_MainEngines,
					"Total_PowerOf_Auxiliary_Engines": dat.Total_PowerOf_Auxiliary_Engines,
					"fuel_type_1_first": dat.fuel_type_1_first,
					"fuel_type_1_second": dat.fuel_type_1_second,
					"fuel_type_first_capacity": dat.fuel_type_first_capacity,
					"fuel_type_second_capacity": dat.fuel_type_second_capacity,
					"consumption_value_2": dat.consumption_value_2,
					"delivery_month": dat.delivery_month,
					"delivery_year": dat.delivery_year,
					"light_weight_tons": dat.light_weight_tons,
					"block_coeficient": dat.block_coeficient
				} 
				arr.push(vessellist);
			}
			const  responseData = {
				'success':true,
				'message':"Vessel list",
				'data':arr
			}
			res.send(responseData);
			
		}else{
			const  responseData = {
				'success':false,
				'message':"Data not found"
			}
			res.send(responseData);
		}
		
	})
	
}
module.exports.vesselBase = (req,res) => {
	knex.select('vessel_base.id','vessel_base.vessel_base_name').from('vessel_base').where({is_delete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel Base list",
			'data':listdata
		}
		res.send(responseData);
	})
}

module.exports.vesselStatus = (req,res) => {
	knex.select('status_master.id','status_master.status_master_name').from('status_master').where({isDelete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel status list",
			'data':listdata
		}
		res.send(responseData);
	})
}
module.exports.commentList = (req,res) => {
	knex.select('comment.id','comment.comment_name').from('comment').where({is_delete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel comment list",
			'data':listdata
		}
		res.send(responseData);
	})
}

module.exports.vesselDelete = (req,res) => {
	var data = req.body;
	console.log(data);
	knex('vessel_management').where({id:data.id}).del().then((resdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel delete successfully"
		}
		res.send(responseData);
	})

}
module.exports.vesselUpdate = (req,res) => {
	//var files = req.files;
	var data =req.body;
	// if(files.company_background_sheet){
	// 	var sheet_background = 'company_background_sheet' + myDate + files.company_background_sheet[0].originalname;   
	// }
	// if(files.vessal_history_sheet){
	// 	var sheet_vessel_history = 'vessal_history_sheet' +myDate + files.vessal_history_sheet[0].originalname;
	// }	
	// if(files.operating_record_sheet){
	// 	var sheet_record ='operating_record_sheet'+ myDate + files.operating_record_sheet[0].originalname;
	// }
	knex('vessel_management').where({ id : data.id }).then((resdata) => { 
		if(resdata.length>0){
			if(data.company_background_sheet){   
				fs.unlink('upload/'+resdata[0].sheet_background, (err) => {
					if (err){
						console.log("file not found");
					}else{
						console.log('sheet background file was deleted');
					}
				});
			}
			if(data.vessal_history_sheet){
				fs.unlink('upload/'+resdata[0].sheet_vessel_history, (err) => {
					if (err){
						console.log("file not found");
					}else{
						console.log('sheet vessel history file was deleted');
					}
				});	
			}	
			if(data.operating_record_sheet){
				fs.unlink('upload/'+resdata[0].sheet_record, (err) => {
					if (err){
						console.log("sheet record file not found");
					}else{
						console.log('sheet record file was deleted');
					}
				});
			}
			if(data.bulbows_bow == 'true'){
                 var bulbows_bow = 'Y'
	  		}else{
                     var bulbows_bow = 'N'
	  		}
			if(data.dbl_bottom == 'true'){
				var dbl_bottom = 'Y'
			}else{
				var dbl_bottom = 'N'

			}
			if(data.bollard_pull == 'true'){
				var bollard_pull = 'Y'
			}else{
				var bollard_pull = 'N'

			}
			if(data.dbl_deck == 'true'){
				var dbl_deck = 'Y'
			}else{
				var dbl_deck = 'N'

			}
			if(data.dbl_side_skins == 'true'){
				var dbl_side_skins = 'Y'
			}else{
				var dbl_side_skins = 'N'

			}
			if(data.grabs == 'yes'){
				var grabs = 'Y'
			}else{
				var grabs = 'N'

			}
			knex('vessel_management').update({
				imo                              :  data.imo,
				vessel_name                      :  data.vessel_name,
				id_operator                      :  data.id_operator,
				id_builder                       :  data.id_builder,
				id_comment                       :  data.id_comment,
				yard                             :  data.yard_number,
				hull_number                      :  data.hull,
				built_month                      :  data.built_month,
				built_year                       :  data.built_year,
				grt                              :  data.grt,
				nrt                              :  data.nrt,
				id_ship_type                     :  data.vessel_type,
				bale_meter                       :  data.bale_meter_capacity,
				grain_meter                      :  data.grain_meter_capacity,
				bale_feet                        :  data.bale_feet_capacity,
				grain_feet                       :  data.grain_feet_capacity,
				hatches                          :  data.number_of_hatches,
				length_hold                      :  data.length_hold,
				height_hold                      :  data.height_hold,
				length_hatch                     :  data.length_hatch,
				height_hatch                     :  data.height_hatch,
				width_hold_before                :  data.width_hold_before,
				width_hold_after                 :  data.width_hold_after,
				width_hatch_before               :  data.width_hatch_before,
				width_hatch_after                :  data.width_hatch_after,
				gear                             :  data.gear,
				swl                              :  data.swl,
				loa                              :  data.loa,
				lbp                              :  data.lbp,
				beam                             :  data.beam,
				depth                            :  data.depth,
				breath_moulded                   :  data.breadth_moulded,
				tpc                              :  data.tpc,
				disp                             :  data.displacement,
				survey_month                     :  data.survey_month,
				survey_year                      :  data.survey_year,
				id_main_engine_design            :  data.main_engine_design,
				id_main_engine_type              :  data.main_engine_type,
				id_aux_engine_design             :  data.aux_engine_design,
				id_aux_engine_type               :  data.aux_engine_type,
				ship_power                       :  data.power,
				speed_laden_1                    :  data.speed_laden_1,
				speed_ballast_1                  :  data.speed_ballast_1,
				laden_fuel_1                     :  data.laden_fuel_1,
				ballast_fuel_1                   :  data.ballast_fuel_1,
				id_fuel_type_laden_1             :  data.id_fuel_type_laden_1,
				id_fuel_type_ballast_1           :  data.id_fuel_type_ballast_1,
				cb                               :  data.country_of_build,
				speed_laden_2                    :  data.speed_laden_2,
				speed_ballast_2                  :  data.speed_ballast_2,
				laden_fuel_2                     :  data.laden_fuel_2,
				ballast_fuel_2                   :  data.ballast_fuel_2,
				id_fuel_type_laden_2             :  data.id_fuel_type_laden_2,
				id_fuel_type_ballast_2           :  data.id_fuel_type_ballast_2,
				speed_laden_3                    :  data.speed_laden_3,
				speed_ballast_3                  :  data.speed_ballast_3,
				laden_fuel_3                     :  data.laden_fuel_3,
				ballast_fuel_3                   :  data.ballast_fuel_3,
				id_fuel_type_laden_3             :  data.id_fuel_type_laden_3,
				id_fuel_type_ballast_3           :  data.id_fuel_type_ballast_3,
				aux_hours                        :  data.engine_hours,
				fuel_aux_1                       :  data.fuel_aux_1,
				id_fuel_type_aux_1               :  data.id_fuel_type_aux_1,
				fuel_aux_2                       :  data.fuel_aux_2,
				id_fuel_type_aux_2               :  data.id_fuel_type_aux_2,
				fuel_aux_3                       :  data.fuel_aux_3,
				id_fuel_type_aux_3               :  data.id_fuel_type_aux_3,
				id_ship_flag                     :  data.flag,
				id_ship_base                     :  data.base,
				id_ship_status                   :  data.status,
				cost                             :  data.cost,
				scrap_value                      :  data.scrap_value,
				amo_period                       :  data.amorization_period,
				cost_capital                     :  data.cost_of_capital,
				annual_cost                      :  data.annual_operating_cost,
				be_cost                          :  data.breakeven_daily_cost,
				daily_cost                       :  data.daily_operating_cost,
				id_port_reg                      :  data.port_of_registry,
				id_ship_manager                  :  data.ship_manager,
				id_owner                         :  data.owner,
				call_sign                        :  data.call_sign,
				ship_age                         :  data.age_of_ship,
				ice_class                        :  data.ice_class,
				in_fax                           :  data.inmarsat_fax,
				in_telex                         :  data.inmarsat_telex,
				smc_company                      :  data.smc_company,
				smc_issued                       :  data.smc_issued,
				smc_issued_date                  :  data.smc_issued_date,
				smc_expiry_date                  :  data.smc_expiry_date,
				crew                             :  data.crew,
				id_officer_nationality           :  data.officiers_nationality,
				id_crew_nationality              :  data.crew_nationality,
				hull_material                    :  data.hull_material,
				decks                            :  data.decks_number,
				bulbows_bow                      :  data.bulbows_bow,
				dbl_bottom                       :   dbl_bottom,
				bollard_pull                     :  bollard_pull,
				dbl_deck                         :  dbl_deck,
				dbl_side_skins                   :  dbl_side_skins,
				winches                          :  data.winches,
				id_activity                      :  data.activity,
				sheet_background                 :  data.company_background_sheet,
	  			sheet_vessel_history             :  data.vessal_history_sheet,
	  			sheet_record                     :  data.operating_record_sheet,
				dwt_trop                         :  data.dwt_tropical,
				dwt_trop_fresh                   :  data.dwt_tropical_freshwater,
				dwt_fresh                        :  data.dwt_freshwater,
				dwt_summer                       :  data.dwt_summer,
				draft_trop                       :  data.draft_tropical,
				draft_trop_fresh                 :  data.draft_tropical_freshwater,
				draft_fresh                      :  data.draft_freshwater,
				draft_summer                     :  data.draft_summer,
				ship_const                       :  data.constants,
				created_by                       :  data.created_by,
				updated_by                       :  data.updated_by,
				consumption_speed                :  data.consumption_speed,
				cylinder_stroke                  :  data.main_engine_stroke_type,
				engine_rpm                       :  data.main_engine_rpm,
				grabs                            :  grabs,
				grabs_number                     :  data.grabs_number,
				grabs_capacity                   :  data.grabs_capacity,
				contract_date                    :  data.contract_date,
				cancel_date                      :  data.cancel_date,
				construction_entry               :  data.new_construction_entry_date,
				pandl_club                       :  data.pandl_club,
				cargo_capacities_narrative       :  data.cargo_capacities_narrative,
				fuel_type_1                      :  data.fuel_type_1,
				fuel_type_2                      :  data.fuel_type_2,
				hull_type                        :  data.hull_type,
				fuel_consumption_main_engine_only:  data.fuel_consumption_main_engine_only,
				group_beneficial_owner           :  data.group_beneficial_owner,
				main_engine_builder              :  data.main_engine_builder,
				main_engine_model                :  data.main_engine_model,
				number_holds                     :  data.number_of_holds,
				class_narrative                  :  data.class_narrative,
				light_weight_tons                :  data.light_weight_tons,
				delivery_month                   :  data.delivery_month,
				delivery_year                    :  data.delivery_year,
				block_coeficient                 : data.block_coeficient,
				delete_month                     :  "02",
				delete_year                      :  "2019",
				is_delete                        :  "N",
				is_active                        :  "Y",
				holds                            :  "holds",
				vessel_info                      :  "vessel_info",
				former_names                     :  "former_names",
				design                           :  "design",
				fdwt                             :  "fdwt",
				scnt                             :  "scnt",
				pcnt                             :  "pcnt",
				shipyard_country                 :  "shipyard_country",
				engine_details                   :  "engine_details",
				sub_status                       :  "sub_status",
				sub_type                         :  "sub_type",
				sub_type1                        :  "sub_type1",
				operator_cod                     :  "operator_cod",
				shipyard                         :  "shipyard",
				engine_layout                    :  "engine_layout",
				engine_stroke                    :  "engine_stroke",
				engine_type                      :  "engine_type",
				type_propulsion                  :  "type_propulsion",
				ldt                              :  "ldt",
				gear_type_largest                :  "gear_type_largest",
				dwt                              :  "1",
				active_month                     :  "12",
				active_year                      :  "2019",
				draft                            :  "1",
				id_class                         :  "1",
				id_port                          :  "1",
				ideas                            :  "1",
				id_position                      :  "1",
				id_tracking                      :  "1",
				fresh_pos_date                   :  "2019-09-18",
				keel_laid                        :  "2019-09-18",
				launched                         :  "2019-09-18",
				scrap                            :  "2019-09-18",
				acquired                         :  "2019-09-18",
				tpi                              :  "1",
				deth                             :  "1",
				last_update                      :  "2019-09-18",
				nb_price                         :  "1",
				engine_number_of                 :  "1",
				engine_hp_total                  :  "1",
				engine_kw_total                  :  "1",
				propulsion_units                 :  "1",
				ore                              :  "1",
				id_registered_owner              :  "1",
				id_cod_registered_owner          :  "1",
				id_main_hull_contractor          :  "1",
				id_main_newbuild_contractor      :  "1",
				id_statcode                      :  "1",
				id_main_engine_builder           :  "1",
				fuel_consumption                 :  "1",
				gear_no_largest                  :  "1",
				gearless                         :  "N",
				consumption_speed2               :  "1",
				consumption_value_1              :  "1",
				Total_PowerOf_AllEngines         :  "1",
				Total_Kilo_wattsof_MainEngines   :  "1",
				Total_PowerOf_Auxiliary_Engines  :  "1",
				fuel_type_1_first                :  "1",
				fuel_type_1_second               :  "1",
				fuel_type_first_capacity         :  "1",
				fuel_type_second_capacity        :  "1",
				consumption_value_2              :  "1"

			}).where({id:data.id}).then((result) => {
				if(result){
					const responseData = {
						'success':true,
						'message':"Your vessel updated successfully"
					}
					res.send(responseData);
				}else{
					const responseData = {
						'success':false,
						'message':"Your vessel not updated"
					}
					res.send(responseData);
				}
			})        
		}else{
			const responseData = {
				'success':false,
				'message':"please provide correct id"
			}
			res.send(responseData);
		}

	});
}
module.exports.vesselBuilder = (req,res) => {
	knex.select('vessel_builder.id','vessel_builder.builder_name').from('vessel_builder').where({is_delete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel Builder list",
			'data':listdata
		}
		res.send(responseData);
	})
}
module.exports.vesselFlag =(req,res) => {
	knex.select('vessel_flag.id','vessel_flag.vessel_flag_name').from('vessel_flag').where({is_delete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel Flag list",
			'data':listdata
		}
		res.send(responseData);
	})
}
module.exports.auxenginedesignList =(req,res) => {
	knex.select('aux_engine_design.id','aux_engine_design.aux_engine_design_name').from('aux_engine_design').where({is_delete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel aux engine design list",
			'data':listdata
		}
		res.send(responseData);
	})
}

module.exports.auxenginetypeList =(req,res) => {
	knex.select('aux_engine_type.id','aux_engine_type.aux_engine_type_name').from('aux_engine_type').where({is_delete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel aux engine type list",
			'data':listdata
		}
		res.send(responseData);
	})
}
module.exports.fueltypesList =(req,res) => {
	knex.select('fuel_types.id','fuel_types.fuel_types_name').from('fuel_types').where({is_delete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel fuel types list",
			'data':listdata
		}
		res.send(responseData);
	})
}
module.exports.nationalityList =(req,res) => {
	knex.select('nationality.id','nationality.nationality_name').from('nationality').where({is_delete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel nationality list",
			'data':listdata
		}
		res.send(responseData);
	})
}
module.exports.portregistryList =(req,res) => {
	knex.select('port_registry.id','port_registry.port_registry_name').from('port_registry').where({is_delete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel port registry list",
			'data':listdata
		}
		res.send(responseData);
	})
}
module.exports.shiptypeList =(req,res) => {
	knex.select('ship_type.id','ship_type.ship_type_name').from('ship_type').where({is_delete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel ship type list",
			'data':listdata
		}
		res.send(responseData);
	})
}
module.exports.vesselActivity =(req,res) => {
	knex.select('activity.id','activity.activity_name').from('activity').where({is_delete:'N'}).then((listdata) => {
		const responseData = {
			'success':true,
			'message':"Vessel activity list",
			'data':listdata
		}
		res.send(responseData);
	})
}
module.exports.vesselDetails = (req,res) => {
	var reqbody = req.body;
	var id = reqbody.id
	var arr = [];
	knex.select('company_management.companyName',
		'company_management.owner',
		'vessel_builder.builder_name',
		'comment.comment_name',
		'vessel_flag.vessel_flag_name',
		'vessel_base.vessel_base_name',
		'aux_engine_design.aux_engine_design_name',
		'aux_engine_type.aux_engine_type_name',
		'fuel_types.fuel_types_name',
		'port_registry.port_registry_name',
		'ship_type.ship_type_name',
		'status_master.status_master_name',        
		'vessel_management.*'
		).from('vessel_management')
	.innerJoin('company_management','company_management.id','vessel_management.id_operator')
	.innerJoin('vessel_builder','vessel_builder.id','vessel_management.id_builder')
	.innerJoin('comment','comment.id','vessel_management.id_comment')
	.innerJoin('vessel_flag','vessel_flag.id','vessel_management.id_ship_flag')
	.innerJoin('vessel_base','vessel_base.id','vessel_management.id_ship_base')
	.innerJoin('aux_engine_design','aux_engine_design.id','vessel_management.id_aux_engine_design')
	.innerJoin('aux_engine_type','aux_engine_type.id','vessel_management.id_aux_engine_type')
	.innerJoin('port_registry','port_registry.id','vessel_management.id_port_reg')
	.innerJoin('ship_type','ship_type.id','vessel_management.id_ship_type')
	.innerJoin('status_master','status_master.id','vessel_management.id_ship_status')
	.innerJoin('fuel_types','fuel_types.id','vessel_management.id_fuel_type_laden_1')
	.where({'vessel_management.id': id }).then( async (data) =>{
		if(data.length>0){
			var newdata = await data;
			await knex.select('nationality.nationality_name').from('vessel_management').innerJoin('nationality','nationality.id','vessel_management.id_crew_nationality').where({'vessel_management.id':id}).then((redata) => {
				for(redat of redata){
					var crew_nationality = redat.nationality_name;
				}
				var rdat = {
					'crew_nationality':crew_nationality
				}
				newdata.push(rdat);             
			})
			await knex.select('nationality.nationality_name').from('vessel_management').innerJoin('nationality','nationality.id','vessel_management.id_officer_nationality').where({'vessel_management.id':id}).then((rdata) => {
				for(rda of rdata){
					var officer_nationality = rda.nationality_name;
				}
				var ofnat = {
					'officer_nationality':officer_nationality
				}
				newdata.push(ofnat);             
			})
			//console.log(arr);
			const  responseData = {
				'success':true,
				'message':"Vessel list",
				'data':newdata
			}
			res.send(responseData); 
		}else{
			const  responseData = {
				'success':false,
				'message':"Data not found"
			}
			res.send(responseData); 
		}


	})
}
module.exports.addvesselPosition =(req,res) => {
	var data = req.body;
	var positiondata = {
		id_ship              : data.id_ship,
		id_port              : data.port_id,
		id_operator          : data.operator_id,  	
		open_date_from       : data.lay_can,
		id_comment           : data.comment_id,
		created_by           : data.created_by,
		updated_by           : data.updated_by,
		is_delete            : "N", 
		is_active            : "Y"
	}
	knex('position').insert(positiondata).then((result) => {
		const responseData = {
			'success':true,
			'message':"Vessel position added successfully"
		}
		res.send(responseData);
	})
}
module.exports.vesselportList =(req,res) => {
	knex.select('port.id','port.main_port').from('port').where({is_delete:'N'}).then((listdata) => {
		if(listdata.length>0){
			const responseData = {
				'success':true,
				'message':"Vessel port list",
				'data':listdata
			}
			res.send(responseData);
		}else{
			const responseData = {
				'success':false,
				'message':"Vessel port data not found"
			}
			res.send(responseData);
		}
	})
}
module.exports.vesselpositionList = (req,res) => {
	var data = req.body;
	var id_ship = data.id_ship;
	//console.log(id_ship)
	knex.select('port.id_zone','position.open_date_from','port.main_port').from('position').innerJoin('port','port.id','position.id_port').where({'position.id_ship':id_ship,'position.is_delete':'N'}).then( async (listdata) => {
		if(listdata.length>0){
			//console.log(listdata)
			var newdata = [];
			for(dat of listdata){
				var open_date_from1 = await dat.open_date_from;
				var open_date_from = await moment(open_date_from1).format('lll');
				var showdata = {
					"open_date_from": open_date_from,
					"main_port" : dat.main_port
				}
				newdata.push(showdata);
			}
			for(redat of listdata){
				var zoneid = redat.id_zone;
			}
			if(zoneid){
				await knex.select('zone.zone_name').from('zone').where({id:zoneid}).then((rdata) => {
					for(zid of rdata){
						var zone_name = zid.zone_name;
					}
					const zonename = {
						'zone_name': zone_name
					}
					newdata.push(zonename);
				})
			}
			
			const responseData = {
				'success':true,
				'message':"Vessel port list",
				'data':newdata
			}
			res.send(responseData);
		}else{
			const responseData = {
				'success':false,
				'message':"Data not found"
			}
			res.send(responseData);
		}
	})
}
module.exports.addvesselTracking =(req,res) => {
	var data = req.body;
	var trackingdata = {
		id_ship            : data.id_ship, 
		id_activity        : data.id_activity,
		id_material        : data.id_material,
		id_port            : data.id_port,
		id_berth           : data.id_berth,
		qty                : data.qty,
		date_arrival       : data.date_arrival,
		date_dept          : data.date_dept,
		voy_charterer      : data.voy_charterer,
		voy_rate           : data.voy_rate,
		world_scale        : data.world_scale,
		coa_rate           : data.coa_rate,
		operator           : data.operator,
		daily_rate         : data.daily_rate,
		notify_me          : data.notify_me,
		created_by         : data.created_by,
		updated_by         : data.updated_by,
		is_delete          : "N", 
		is_active          : "Y"
	}
	knex('tracking').insert(trackingdata).then((result) => {
		const responseData = {
			'success':true,
			'message':"Vessel tracking added successfully"
		}
		res.send(responseData);
	})
}
module.exports.vesselmaterialList =(req,res) => {
	knex.select('material.id','material.material_name').from('material').where({is_delete:'N'}).then((listdata) => {
		if(listdata.length>0){
			const responseData = {
				'success':true,
				'message':"Vessel material list",
				'data':listdata
			}
			res.send(responseData);
		}else{
			const responseData = {
				'success':false,
				'message':"Vessel material data not found"
			}
			res.send(responseData);
		}
	})
}
module.exports.vesselportberthList =(req,res) => {
	knex.select('port_berth.id','port_berth.port_berth_name').from('port_berth').where({is_delete:'N'}).then((listdata) => {
		if(listdata.length>0){
			const responseData = {
				'success':true,
				'message':"Vessel port berth list",
				'data':listdata
			}
			res.send(responseData);
		}else{
			const responseData = {
				'success':false,
				'message':"Vessel port berth data not found"
			}
			res.send(responseData);
		}
	})
}

module.exports.vesseltrackinglist = (req,res) => {
   var data = req.body;
   var id_ship = data.id_ship;
   knex.select('tracking.qty','tracking.sea_days','tracking.port_days','tracking.date_dept','tracking.date_arrival','vessel_management.vessel_name','activity.activity_name','material.material_name','port.main_port','tracking.id_berth').from('tracking')
   .innerJoin('vessel_management','vessel_management.id','tracking.id_ship')
   .innerJoin('activity','activity.id','tracking.id_activity')
   .innerJoin('material','material.id','tracking.id_material')
   .innerJoin('port','port.id','tracking.id_port')
   .where({'tracking.id_ship':id_ship,'tracking.is_delete':'N'}).then( async (listdata) => {
	if(listdata.length>0){
		//console.log(listdata)
		var newdata =[];
		for(dat of listdata){
			var date_dept1 = await dat.date_dept;
			var date_dept = await moment(date_dept1).format('lll');
			var date_arrival1 = await dat.date_arrival;
            var date_arrival = await moment(date_arrival1).format('lll');
             var listshow = {
				"qty": dat.qty,
				"sea_days": dat.sea_days,
				"port_days":dat.port_days,
				"date_dept": date_dept,
				"date_arrival": date_arrival,
				"vessel_name": dat.vessel_name,
				"activity_name": dat.activity_name,
				"material_name": dat.material_name,
				"main_port": dat.main_port,
				"id_berth": dat.id_berth
			 }
			 newdata.push(listshow);
		}
		  
		for(redat of listdata){
			var id_berth = redat.id_berth;
		}
		if(id_berth){
			await knex.select('port_berth_name').from('port_berth').where({id:id_berth}).then((rdata) => {
				for(zid of rdata){
					var port_berth_name1 = zid.port_berth_name;
				}
				const port_berth_name = {
					'port_berth_name': port_berth_name1
				}
				newdata.push(port_berth_name);
			})
		}
		
		const responseData = {
			'success':true,
			'message':"Vessel tracking list",
			'data':newdata
		}
		res.send(responseData);
	}else{
		const responseData = {
			'success':false,
			'message':"Data not found"
		}
		res.send(responseData);
	}
})
}
module.exports.vesselpositiondelete = (req,res) => {
	var data = req.body;
	var id = data.id;
	
	knex('position').update({is_delete:'Y'}).where({id:id}).then((datah) => {
         if(datah){
			const responseData = {
				'success':true,
				'message':"vessel position deleted successfully"
			}
			res.send(responseData);
		 }else{
			const responseData = {
				'success':false,
				'message':"vessel position not deleted"
			}
			res.send(responseData);
		 }
	})
}

module.exports.vesseltrackingdelete = (req,res) => {
	var data = req.body;
	var id = data.id;
	
	knex('tracking').update({is_delete:'Y'}).where({id:id}).then((datah) => {
         if(datah){
			const responseData = {
				'success':true,
				'message':"vessel tracking deleted successfully"
			}
			res.send(responseData);
		 }else{
			const responseData = {
				'success':false,
				'message':"vessel tracking not deleted"
			}
			res.send(responseData);
		 }
	})
}
//Storage the folder functionality
var storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cd(null, 'upload/')
    },
    filename: function(req, file, cd) {
        //// console.log(req.file);
        cd(null, myDate + file.originalname)
    }

})

//upload the file function
var upload = multer({
    storage: storage
}).any('');


//image_upload
module.exports.FileUpload = (req, res) => {
    upload(req, res, function(err) {
        if (err) {
           // console.log(err)
        } else {

            var filename = req.files;
            const map1 = filename.map(data => {

                var fileurl = "http://3.89.115.24:3008/"+myDate+data.originalname;
                res.json({
                    "success": true,
                    "message": 'File uploaded',
                    "url": myDate+data.originalname,
                    "fileurl": fileurl
                })

            })
        }
    })
}


