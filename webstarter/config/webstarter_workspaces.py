import frappe

def create_webstarter_workspace():
    if not frappe.db.exists("Workspace", "Webstarter"):
        frappe.get_doc({
            "doctype": "Workspace",
            "module": "webstarter",
            "label": "Webstarter",
            "is_standard": 1,
            "for_user": "",
            "hidden": 0,
            "public": 1,
            "items": [
                {
                    "type": "doctype",
                    "label": "Web Page",
                    "name": "Web Page",
                    "icon": "octicon octicon-file",
                    "route": "List/Web Page",
                },
                {
                    "type": "doctype",
                    "label": "Web Template",
                    "name": "Web Template",
                    "icon": "octicon octicon-file-code",
                    "route": "List/Web Template",
                },
                {
                    "type": "doctype",
                    "label": "Blog Post",
                    "name": "Blog Post",
                    "icon": "octicon octicon-file-text",
                    "route": "List/Blog Post",
                },
                {
                    "type": "doctype",
                    "label": "Blog Category",
                    "name": "Blog Category",
                    "icon": "octicon octicon-tag",
                    "route": "List/Blog Category",
                },
                {
                    "type": "doctype",
                    "label": "Blog Settings",
                    "name": "Blog Settings",
                    "icon": "octicon octicon-settings",
                    "route": "List/Blog Settings",
                },
                {
                    "type": "doctype",
                    "label": "Blogger",
                    "name": "Blogger",
                    "icon": "octicon octicon-person",
                    "route": "List/Blogger",
                },
                {
                    "type": "doctype",
                    "label": "Web Settings",
                    "name": "Web Settings",
                    "icon": "octicon octicon-tools",
                    "route": "List/Web Settings",
                },
            ]
        }).insert()
