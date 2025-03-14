import json
import sys
import os

def save_config(config):
    # Save to config.json in the current directory
    config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config.json')
    with open(config_path, 'w') as file:
        json.dump(config, file, indent=4)
    print(f"Configuration saved to {config_path}")

def update_config(sku):
    sku = int(sku) # Convert to integer
    # Define specific changes for each SKU
    sku_configs = {
        1: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[90, 50,50], "upper_bound":[130,255,255], "class_sku":4,"pixel_ratio" :0.4, "output_dir":"comfort_blue_cross_pack"}, #comfort _blue_860_ml_morning fresh
        2: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[0,50,50], "upper_bound":[10,255,255], "lower_bound_1": [160,50,50],"upper_bound_1":[180,255,255],"class_sku":4,"pixel_ratio" :0.4, "output_dir":"comfort_pink_cross_pack"}, #comfort pink 860 ml lily fresh
        3: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[35, 50, 50], "upper_bound":[85, 255, 255], "class_sku":4,"pixel_ratio" :0.4, "output_dir":"comfort_green_cross_pack"}, #comfort green 860 ml garden fresh 
        4: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[0,50, 50], "upper_bound":[10,255,255], "lower_bound_1": [160,50,50],"upper_bound_1":[180,255,255],"class_sku":0,"pixel_ratio" :0.4, "output_dir":"rin_front_load_cross_pack"}, #rin matic front load 
        5: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[90, 50, 50], "upper_bound":[130, 255, 255], "class_sku":0,"pixel_ratio" :0.4, "output_dir":"rin_matic_top_load_cross_pack"}, #rin matic top load 
        6: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '>=',"lower_bound":[110, 50, 50], "upper_bound":[150, 200, 255], "class_sku":1,"pixel_ratio" :0.1, "output_dir":"surf_excel_front_500_ml_cross_pack"}, #surf excel matic front load 500 ml
        7: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '>=',"lower_bound":[80, 50, 30], "upper_bound":[120, 255, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_Top_500_ml_cross_pack"}, # surf execel matic top load 500 ml
        8: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[0,0,180], "upper_bound":[180, 65, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_easy_wash_1ltr_cross_pack"}, #surf excel easy wash 1 ltr
        9: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '>=',"lower_bound":[0,0,180], "upper_bound":[180, 65, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_easy_wash_500_ml_cross_pack"}, #surf excel eash wash 500 ml 
        10: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[5, 100, 30], "upper_bound":[25, 255, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_quick_wash_1_ltr"}, #surf excel quick wash 1 ltr
        11: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '>=',"lower_bound":[5, 100, 30], "upper_bound":[25, 255, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_quick_wash_500_ml"}, #surf excel quick wash 500 ml
        12: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[90, 50, 50], "upper_bound":[130, 255, 255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_matic_top_load_1ltr"}, #surf_excel_matic_top_load_1_ltr
        13: {"model_source": "serac2_cross_pack_07_03_2025.pt", "plc_ip": '192.168.20.124', "conf": 0.5, "y_axis":450, "y_condition": '<=',"lower_bound":[0,50,50], "upper_bound":[10, 255, 255],"lower_bound_1": [160, 50, 50],"upper_bound_1":[180,255,255], "class_sku":1,"pixel_ratio" :0.4, "output_dir":"surf_excel_matic_front_load_1_ltr"}, #surf_excel_matic_front_load_1_ltr
    }

    if sku in sku_configs:
        # Save the configuration
        save_config(sku_configs[sku])
        
        # Also inform the user through console
        sku_name = "unknown"
        if sku == 1: sku_name = "Comfort Blue 860ml Morning Fresh"
        elif sku == 2: sku_name = "Comfort Pink 860ml Lily Fresh"
        elif sku == 3: sku_name = "Comfort Green 860ml Garden Fresh"
        elif sku == 4: sku_name = "Rin Matic Front Load"
        elif sku == 5: sku_name = "Rin Matic Top Load"
        elif sku == 6: sku_name = "Surf Excel Matic Front 500ml"
        elif sku == 7: sku_name = "Surf Excel Matic Top 500ml"
        elif sku == 8: sku_name = "Surf Excel Easy Wash 1L"
        elif sku == 9: sku_name = "Surf Excel Easy Wash 500ml"
        elif sku == 10: sku_name = "Surf Excel Quick Wash 1L"
        elif sku == 11: sku_name = "Surf Excel Quick Wash 500ml"
        elif sku == 12: sku_name = "Surf Excel Matic Top Load 1L"
        elif sku == 13: sku_name = "Surf Excel Matic Front Load 1L"
        
        print(f"Configuration updated for SKU {sku}: {sku_name}")
        
        # Run the appropriate Python script with this config if needed
        # For example, you might want to do this:
        # import subprocess
        # subprocess.Popen(['python', 'your_main_script.py'])
        
        return True
    else:
        print(f"No configuration defined for SKU {sku}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            sku_number = int(sys.argv[1])
            update_config(sku_number)
        except ValueError:
            print("Invalid SKU number. Please provide a valid integer.")
    else:
        print("Please provide an SKU number as an argument.")