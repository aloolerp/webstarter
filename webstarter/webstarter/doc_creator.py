import frappe



@frappe.whitelist()
def create_component_item_doctype(selected_module):
    """
    Creates the 'Component Item' child table doctype in the selected module.
    """
    if frappe.db.exists("DocType", "Component Item"):
        frappe.msgprint("Doctype 'Component Item' already exists.")
        return

    component_item = frappe.get_doc({
        "doctype": "DocType",
        "name": "Component Item",
        "module": selected_module,
        "istable": 1,
        "track_changes": 1,
        "editable_grid": 1,
        "field_order": ["label", "fieldname", "fieldtype", "reqd", "map_item", "in_list_view", "options", "default"],
        "fields": [
            {"fieldname": "label", "fieldtype": "Data", "label": "Label", "in_list_view": 1, "reqd": 1},
            {"fieldname": "fieldname", "fieldtype": "Data", "label": "Fieldname", "in_list_view": 1},
            {"fieldname": "fieldtype", "fieldtype": "Select", "label": "Fieldtype", "options": "Attach Image\nAttach\nCheck\nData\nInt\nLink\nSelect\nSmall Text\nText\nMarkdown Editor\nSection Break\nColumn Break\nTable Break", "reqd": 1, "in_list_view": 1},
            {"fieldname": "reqd", "fieldtype": "Check", "label": "Mandatory", "default": "0"},
            {"fieldname": "map_item", "fieldtype": "Check", "label": "Map Item", "default": "0"},
            {"fieldname": "in_list_view", "fieldtype": "Check", "label": "In List View", "default": "0"},
            {"fieldname": "options", "fieldtype": "Small Text", "label": "Options"},
            {"fieldname": "default", "fieldtype": "Small Text", "label": "Default"}
        ]
    })

    component_item.insert()
    frappe.msgprint(f"Doctype 'Component Item' created successfully in module {selected_module}", alert=True)
# To call this with the module prompt
# prompt_module(create_component_item_doctype)

@frappe.whitelist()
def create_page_item_doctype(selected_module):
    """
    Creates the 'Page Item' child table doctype in the selected module.
    """
    if frappe.db.exists("DocType", "Page Item"):
        frappe.msgprint("Doctype 'Page Item' already exists.")
        return

    page_item = frappe.get_doc({
        "doctype": "DocType",
        "name": "Page Item",
        "module": selected_module,
        "istable": 1,
        "track_changes": 1,
        "editable_grid": 1,
        "field_order": [
            "type", "web_template", "section", "edit_values", "web_template_values", 
            "css_class", "section_id", "column_break_5", "add_container", "add_top_padding", 
            "add_bottom_padding", "add_border_at_top", "add_border_at_bottom", "add_shade", 
            "hide_block", "add_background_image", "background_image", "add_animation", 
            "add_shadow", "add_overlay", "text_alignment", "background_color"
        ],
        "fields": [
            {"fieldname": "type", "fieldtype": "Select", "label": "Type", "options": "Page Block\nSection\nDefault", "in_list_view": 1},
            {"fieldname": "web_template", "fieldtype": "Link", "label": "Component", "options": "Page Component", "depends_on": "eval:doc.type==\"Page Block\"", "in_list_view": 1},
            {"fieldname": "section", "fieldtype": "Link", "label": "Section", "options": "Web Template", "depends_on": "eval:doc.type==\"Section\"", "in_list_view": 1},
            {"fieldname": "edit_values", "fieldtype": "Button", "label": "Edit Values", "in_list_view": 1},
            {"fieldname": "web_template_values", "fieldtype": "Code", "label": "Web Template Values", "options": "JSON"},
            {"fieldname": "css_class", "fieldtype": "Small Text", "label": "CSS Class"},
            {"fieldname": "section_id", "fieldtype": "Data", "label": "Section ID", "description": "IDs must contain only alphanumeric characters, not contain spaces, and should be unique."},
            {"fieldname": "column_break_5", "fieldtype": "Column Break"},
            {"fieldname": "add_container", "fieldtype": "Check", "label": "Add Container", "default": "1"},
            {"fieldname": "add_top_padding", "fieldtype": "Check", "label": "Add Space at Top", "default": "1"},
            {"fieldname": "add_bottom_padding", "fieldtype": "Check", "label": "Add Space at Bottom", "default": "1"},
            {"fieldname": "add_border_at_top", "fieldtype": "Check", "label": "Add Border at Top", "default": "0"},
            {"fieldname": "add_border_at_bottom", "fieldtype": "Check", "label": "Add Border at Bottom", "default": "0"},
            {"fieldname": "add_shade", "fieldtype": "Check", "label": "Add Gray Background", "default": "0"},
            {"fieldname": "hide_block", "fieldtype": "Check", "label": "Hide Block", "default": "0"},
            {"fieldname": "add_background_image", "fieldtype": "Check", "label": "Add Background Image", "default": "0"},
            {"fieldname": "background_image", "fieldtype": "Attach Image", "label": "Background Image", "depends_on": "add_background_image"},
            {"fieldname": "add_animation", "fieldtype": "Check", "label": "Add Animation", "default": "0"},
            {"fieldname": "add_shadow", "fieldtype": "Check", "label": "Add Shadow", "default": "0"},
            {"fieldname": "add_overlay", "fieldtype": "Check", "label": "Add Overlay", "default": "0"},
            {"fieldname": "text_alignment", "fieldtype": "Select", "label": "Text Alignment", "options": "\nleft\ncenter\nright"},
            {"fieldname": "background_color", "fieldtype": "Data", "label": "Background Color"}
        ]
    })

    page_item.insert()
   
    frappe.msgprint(f"Doctype 'Page Item' created successfully in module {selected_module}", alert=True)

# To call this with the module prompt
# prompt_module(create_page_item_doctype)

@frappe.whitelist()
def create_page_component_doctype(selected_module):
    """
    Creates the 'Page Component' doctype with specified fields, options, and permissions in the selected module.
    """
    # Check if 'Page Component' already exists
    if frappe.db.exists("DocType", "Page Component"):
        frappe.msgprint("Doctype 'Page Component' already exists.")
        return

    # Define the Page Component doctype
    page_component = frappe.get_doc({
        "doctype": "DocType",
        "name": "Page Component",
        "module": selected_module,
        "naming_rule": "Expression",
        "autoname": "format:{title}",
        "allow_rename": 1,
        "track_changes": 1,
        "editable_grid": 1,
        "allow_import": 1,
        "index_web_pages_for_search": 1,
        "field_order": ["title", "type", "standard", "module", "column_break_gtqh", "generate", "page", "folder_name", "template_section", "template", "section_break_ynol", "fields"],
        "fields": [
            {"fieldname": "title", "fieldtype": "Data", "label": "Title", "reqd": 1},
            {"fieldname": "type", "fieldtype": "Select", "label": "Type", "options": "Component\nSection\nNavbar\nFooter", "default": "Section", "in_list_view": 1, "in_standard_filter": 1},
            {"fieldname": "standard", "fieldtype": "Check", "label": "Standard", "default": "0", "in_list_view": 1, "in_standard_filter": 1},
            {"fieldname": "module", "fieldtype": "Link", "label": "Module", "options": "Module Def", "mandatory_depends_on": "eval:doc.standard==1"},
            {"fieldname": "column_break_gtqh", "fieldtype": "Column Break"},
            {"fieldname": "generate", "fieldtype": "Select", "label": "Generation Path", "options": "Default\nPage\nFolder Name", "default": "Default"},
            {"fieldname": "page", "fieldtype": "Link", "label": "Page", "depends_on": "eval:doc.generate==\"Page\"", "options": "Web Page"},
            {"fieldname": "folder_name", "fieldtype": "Data", "label": "Folder Name", "depends_on": "eval:doc.generate==\"Folder Name\""},
            {"fieldname": "template_section", "fieldtype": "Section Break", "label": "Template", "collapsible": 1},
            {"fieldname": "template", "fieldtype": "Code", "label": "Template", "options": "JavaScript", "depends_on": "eval:!doc.standard"},
            {"fieldname": "section_break_ynol", "fieldtype": "Section Break"},
            {"fieldname": "fields", "fieldtype": "Table", "label": "Fields", "options": "Component Item"}
        ],
        "permissions": [
            {"role": "System Manager", "read": 1, "write": 1, "create": 1, "delete": 1, "export": 1, "email": 1, "print": 1, "share": 1, "report": 1},
            {"role": "Guest", "read": 1, "export": 1, "email": 1, "print": 1, "share": 1, "report": 1}
        ],
        "sort_field": "modified",
        "sort_order": "DESC"
    })

    # Insert the doctype
    page_component.insert()
    frappe.msgprint(f"Doctype 'Page Component' created successfully in module {selected_module}", alert=True)

# To call this with the module prompt
# prompt_module(create_page_component_doctype)



@frappe.whitelist()
def create_front_page_doctype(selected_module):
    """
    Creates the 'Front Page' doctype with specified fields, options, and permissions in the selected module.
    """
    # Check if 'Front Page' already exists
    if frappe.db.exists("DocType", "Front Page"):
        frappe.msgprint("Doctype 'Front Page' already exists.")
        return

    front_page = frappe.get_doc({
        "doctype": "DocType",
        "name": "Front Page",
        "module": selected_module,
        "icon": "fa fa-file-alt",
        "make_attachments_public": 1,
        "index_web_pages_for_search": 1,
        "allow_guest_to_view": 1,
        "allow_import": 1,
        "naming_rule": "Expression",
        "autoname": "format:{route}",
        "description": "Page to show on the website",
        "field_order": [
            "section_title", "title", "route", "dynamic_route", "cb1", "published", 
            "module", "generate", "sb1", "content_type", "slideshow", "dynamic_template", 
            "main_section", "main_section_md", "main_section_html", "page_blocks", 
            "scripting_tab", "context_section", "context_script", "custom_javascript", 
            "javascript", "custom_css", "insert_style", "text_align", "css", "full_width", 
            "show_title", "settings", "publishing_dates_section", "start_date", 
            "column_break_30", "end_date", "metatags_section", "meta_title", 
            "meta_description", "meta_image", "set_meta_tags", "section_break_17", 
            "show_sidebar", "idx", "website_sidebar", "column_break_20", "enable_comments", 
            "sb2", "header", "breadcrumbs"
        ],
        "fields": [
            {"fieldname": "section_title", "fieldtype": "Tab Break", "label": "Content"},
            {"fieldname": "title", "fieldtype": "Data", "in_global_search": 1, "in_list_view": 1, "label": "Title", "no_copy": 1, "reqd": 1},
            {"fieldname": "route", "fieldtype": "Data", "ignore_xss_filter": 1, "in_list_view": 1, "in_standard_filter": 1, "label": "Route", "unique": 1},
            {"default": "0", "fieldname": "dynamic_route", "fieldtype": "Check", "label": "Dynamic Route"},
            {"fieldname": "cb1", "fieldtype": "Column Break", "width": "50%"},
            {"default": "1", "fieldname": "published", "fieldtype": "Check", "in_standard_filter": 1, "label": "Published"},
            {"fieldname": "module", "fieldtype": "Link", "label": "Module (for export)", "options": "Module Def"},
            {"default": "No", "fieldname": "generate", "fieldtype": "Select", "label": "Generate", "options": "No\nYes"},
            {"fieldname": "sb1", "fieldtype": "Section Break", "label": "Content"},
            {"default": "Page Builder", "fieldname": "content_type", "fieldtype": "Select", "label": "Content Type", "options": "Rich Text\nMarkdown\nHTML\nPage Builder\nSlideshow"},
            {"depends_on": "eval:doc.content_type=='Slideshow'", "fieldname": "slideshow", "fieldtype": "Link", "label": "Slideshow", "options": "Website Slideshow"},
            {"default": "0", "fieldname": "dynamic_template", "fieldtype": "Check", "label": "Dynamic Template"},
            {"depends_on": "eval:doc.content_type==='Rich Text'", "fieldname": "main_section", "fieldtype": "Text Editor", "ignore_xss_filter": 1, "in_global_search": 1, "label": "Main Section"},
            {"depends_on": "eval:doc.content_type==='Markdown'", "fieldname": "main_section_md", "fieldtype": "Markdown Editor", "ignore_xss_filter": 1, "label": "Main Section (Markdown)"},
            {"depends_on": "eval:doc.content_type==='HTML'", "fieldname": "main_section_html", "fieldtype": "HTML Editor", "ignore_xss_filter": 1, "label": "Main Section (HTML)"},
            {"depends_on": "eval:doc.content_type=='Page Builder'", "fieldname": "page_blocks", "fieldtype": "Table", "label": "Page Building Blocks", "options": "Page Item"},
            {"fieldname": "scripting_tab", "fieldtype": "Tab Break", "label": "Scripting", "show_dashboard": 1},
            {"collapsible": 1, "collapsible_depends_on": "context_script", "fieldname": "context_section", "fieldtype": "Section Break", "label": "Context"},
            {"description": "<p>Set context before rendering a template. Example:</p><p>\n</p><div><pre><code>\ncontext.project = frappe.get_doc(\"Project\", frappe.form_dict.name)\n</code></pre></div>", "fieldname": "context_script", "fieldtype": "Code", "label": "Context Script", "options": "Python"},
            {"collapsible": 1, "collapsible_depends_on": "javascript", "fieldname": "custom_javascript", "fieldtype": "Section Break", "label": "Script"},
            {"fieldname": "javascript", "fieldtype": "Code", "label": "Javascript", "options": "Javascript"},
            {"collapsible": 1, "collapsible_depends_on": "insert_style", "fieldname": "custom_css", "fieldtype": "Tab Break", "label": "Style"},
            {"default": "0", "fieldname": "insert_style", "fieldtype": "Check", "label": "Insert Style"},
            {"fieldname": "text_align", "fieldtype": "Select", "label": "Text Align", "options": "Left\nCenter\nRight"},
            {"depends_on": "insert_style", "fieldname": "css", "fieldtype": "Code", "label": "CSS", "options": "CSS"},
            {"default": "1", "fieldname": "full_width", "fieldtype": "Check", "label": "Full Width"},
            {"default": "0", "fieldname": "show_title", "fieldtype": "Check", "label": "Show Title"},
            {"fieldname": "settings", "fieldtype": "Tab Break", "label": "Settings"},
            {"fieldname": "publishing_dates_section", "fieldtype": "Section Break", "label": "Publishing Dates"},
            {"fieldname": "start_date", "fieldtype": "Datetime", "label": "Start Date"},
            {"fieldname": "column_break_30", "fieldtype": "Column Break"},
            {"fieldname": "end_date", "fieldtype": "Datetime", "label": "End Date"},
            {"fieldname": "metatags_section", "fieldtype": "Section Break", "label": "Meta Tags"},
            {"fieldname": "meta_title", "fieldtype": "Data", "label": "Title"},
            {"fieldname": "meta_description", "fieldtype": "Small Text", "label": "Description"},
            {"fieldname": "meta_image", "fieldtype": "Attach Image", "label": "Image"},
            {"fieldname": "set_meta_tags", "fieldtype": "Button", "label": "Add Custom Tags"},
            {"collapsible": 1, "fieldname": "section_break_17", "fieldtype": "Section Break", "label": "Sidebar and Comments"},
            {"default": "0", "fieldname": "show_sidebar", "fieldtype": "Check", "label": "Show Sidebar"},
            {"description": "0 is highest", "fieldname": "idx", "fieldtype": "Int", "label": "Priority"},
            {"fieldname": "website_sidebar", "fieldtype": "Link", "label": "Website Sidebar", "options": "Website Sidebar"},
            {"fieldname": "column_break_20", "fieldtype": "Column Break"},
            {"default": "0", "fieldname": "enable_comments", "fieldtype": "Check", "label": "Enable Comments"},
            {"collapsible": 1, "depends_on": "eval:!doc.__islocal", "fieldname": "sb2", "fieldtype": "Section Break", "label": "Header and Breadcrumbs"},
            {"description": "HTML for header section. Optional", "fieldname": "header", "fieldtype": "HTML Editor", "label": "Header"},
            {"description": "List as [{\"label\": _(\"Jobs\"), \"route\":\"jobs\"}]", "fieldname": "breadcrumbs", "fieldtype": "Code", "label": "Breadcrumbs", "options": "JSON"}
        ],
        
        "permissions": [
            {"role": "System Manager", "create": 1, "delete": 1, "read": 1, "submit": 0, "write": 1},
            {"role": "Website Manager", "create": 1, "delete": 1, "read": 1, "submit": 0, "write": 1}
        ]
    })
    # Insert the doctype
    front_page.insert()
    frappe.msgprint(f"Doctype 'Front Page' created successfully in module {selected_module}", alert=True)