<?php
require_once __DIR__ . "/../vendor/autoload.php";

include_once("./Services/UIComponent/classes/class.ilUIHookPluginGUI.php");
include_once("./Services/Init/classes/class.ilStartUpGUI.php");

/**
 * Class ilAssessmentAnticheatingPluginUIHookGUI
 * AntiCheating Userinterface-Hook class
 * @author  Nadimo Staszak <nadimo.staszak@uni-koeln.de>
 * @version $Id$
 * @ingroup ServicesUIComponent
 */
class ilAssessmentAnticheatingUIHookGUI extends ilUIHookPluginGUI
{
    protected $ctrl;
    protected $tpl;
    protected $rbac;
    protected $user;
    protected $plugin;

    /**
     * ilAssessmentAnticheatingPluginUIHookGUI constructor
     */
    public function __construct()
    {
        global $DIC, $tpl;

        $this->ctrl = $DIC->ctrl();
        $this->tpl = $tpl;
        $this->rbac = $DIC->rbac();
        $this->user = $DIC->user();
        $this->plugin = ilAssessmentAnticheatingPlugin::getInstance();

        $this->setPluginObject(ilAssessmentAnticheatingPlugin::getInstance());
    }

    /**
     * Modify HTML output of (all) GUI elements.
     * Adds
     * @param string $a_comp component
     * @param string $a_part string that identifies the part of the UI that is handled
     * @param string $a_par  array of parameters (depend on $a_comp and $a_part)
     * @return array array with entries "mode" => modification mode, "html" => your html
     */
    public function getHTML($a_comp, $a_part, $a_par = array()) : array
    {
        global $DIC;
        $userId = $this->user->getId();
        $is_logged_in = ($userId && $userId != ANONYMOUS_USER_ID);

        // If user is logged in (not anonymous)
        if ($is_logged_in) {
            // If this method is triggered by loading a 'template' (whole page) and this is not an async call
            if ($a_part == "template_load" && !$this->ctrl->isAsynch()) {

                $DIC->globalScreen()->layout()->meta()->addJs($this->plugin->getDirectory() . "/js/anticheating.js");
                $DIC->globalScreen()->layout()->meta()->addCss($this->plugin->getDirectory() . "/templates/css/anticheating.css");

                // Add AntiCheating HTML to output
                $html = $a_par['html'];
                $index = strripos($html, "</body>", -7);
                if ($index !== false) {
                    try {
                        // Set all AntiCheating HTML Template Variables
                        $tmpl = $this->plugin->getTemplate("tpl.anticheating.html", true, true);
                        $tmpl->setVariable('ASSAC_VARIABLE', '');
                        $html = substr($html, 0, $index) . $tmpl->get() . substr($html, $index);
                        return array("mode" => ilUIHookPluginGUI::REPLACE, "html" => $html);
                    } catch (Exception $ex) {

                    }
                }

            }
        }
        // Return without changes
        return array("mode" => ilUIHookPluginGUI::KEEP, "html" => "");
    }

    /**
     * Modify GUI objects, before they generate output
     * @param string $a_comp component
     * @param string $a_part string that identifies the part of the UI that is handled
     * @param string $a_par  array of parameters (depend on $a_comp and $a_part)
     */
    public function modifyGUI($a_comp, $a_part, $a_par = array())
    {

    }
}